import path from "node:path";
import { fileURLToPath } from "node:url";
import { contentFreezePlugin } from "@payload-bites/content-freeze";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";

import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";

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
	localization: {
		defaultLocale: "en",
		locales: ["en", "es"],
	},
	collections: [Pages, Posts, Users],
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
	}),
	plugins: [contentFreezePlugin()],
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
			await payload.create({
				collection: "users",
				data: {
					email: process.env.TEST_USER,
					password: process.env.TEST_PASS,
				},
			});
		}
	},
});
