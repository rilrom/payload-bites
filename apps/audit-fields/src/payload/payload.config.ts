import path from "node:path";
import { fileURLToPath } from "node:url";
import { auditFieldsPlugin } from "@payload-bites/audit-fields";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";

import { Collections } from "./collections/Collections";
import { Users } from "./collections/Users";
import { Globals } from "./globals/Globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		autoLogin: {
			email: process.env.TEST_USER,
		},
	},
	i18n: {
		fallbackLanguage: "en",
		supportedLanguages: { en, es },
	},
	collections: [Collections, Users],
	globals: [Globals],
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
	}),
	plugins: [auditFieldsPlugin()],
	onInit: async (payload) => {
		const response = await payload.find({
			collection: "users",
			where: {
				email: {
					equals: process.env.TEST_USER,
				},
			},
		});

		if (
			process.env.TEST_USER &&
			process.env.TEST_PASS &&
			response?.docs?.length === 0
		) {
			const user = await payload.create({
				collection: "users",
				data: {
					email: process.env.TEST_USER,
					password: process.env.TEST_PASS,
				},
			});

			await payload.update({
				collection: "users",
				id: user.id,
				data: {
					createdBy: {
						relationTo: "users",
						value: user.id,
					},
					lastModifiedBy: {
						relationTo: "users",
						value: user.id,
					},
				},
			});
		}
	},
});
