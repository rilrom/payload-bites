import path from "node:path";
import { fileURLToPath } from "node:url";
import { activityLogPlugin } from "@payload-bites/activity-log";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";

import { Collections } from "./collections/Collections";
import { CollectionWithDrafts } from "./collections/CollectionWithDrafts";
import { Users } from "./collections/Users";
import { Globals } from "./globals/Globals";
import { GlobalWithDrafts } from "./globals/GlobalWithDrafts";

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
	collections: [Collections, CollectionWithDrafts, Users],
	globals: [Globals, GlobalWithDrafts],
	secret: process.env.PAYLOAD_SECRET || "",
	serverURL: process.env.SERVER_URL,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
		migrationDir: path.resolve(dirname, "migrations"),
	}),
	plugins: [
		activityLogPlugin({
			enableDraftAutosaveLogging: false,
			collections: {
				collections: {},
				"collection-with-drafts": {},
				users: {},
			},
			globals: {
				globals: {},
				"global-with-drafts": {},
			},
		}),
	],
	onInit: async (payload) => {
		if (!process.env.TEST_USER || !process.env.TEST_PASS) {
			return;
		}

		const response = await payload.find({
			collection: "users",
			where: {
				email: {
					equals: process.env.TEST_USER,
				},
			},
		});

		if (response?.docs?.length === 0) {
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
