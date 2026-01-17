import path from "node:path";
import { fileURLToPath } from "node:url";
import { FullscreenEditorFeature } from "@payload-bites/fullscreen-editor";
import { postgresAdapter } from "@payloadcms/db-postgres";
import {
	BlocksFeature,
	FixedToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import { buildConfig } from "payload";

import { Block } from "./blocks/Block";
import { Collections } from "./collections/Collections";
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
		livePreview: {
			url: "http://localhost:3000",
			collections: ["collections"],
		},
	},
	i18n: {
		fallbackLanguage: "en",
		supportedLanguages: { en, es },
	},
	collections: [Collections, Users],
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
		migrationDir: path.resolve(dirname, "migrations"),
	}),
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures,
			FixedToolbarFeature(),
			FullscreenEditorFeature(),
			BlocksFeature({
				blocks: [Block],
			}),
		],
	}),
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
