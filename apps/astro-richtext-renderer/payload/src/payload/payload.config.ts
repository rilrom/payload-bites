import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sharpTransformer } from "@payloadcms/transformer-sharp";
import { buildConfig } from "payload";
import { Media } from "@/payload/collections/Media";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";
import { defaultContent } from "./data/defaultContent";
import type { Page } from "./payload-types";

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
	collections: [Pages, Media, Users],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	serverURL: process.env.SERVER_URL,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
	}),
	upload: {
		transformers: [
			sharpTransformer({
				collections: {
					media: {
						variants: [
							{
								name: "rectangle",
								width: 1200,
								height: 600,
								position: "center",
							},
							{
								name: "square",
								width: 400,
								height: 400,
								position: "center",
							},
						],
					},
				},
			}),
		],
	},
	onInit: async (payload) => {
		const response = await payload.find({
			collection: "users",
			overrideAccess: true,
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
				overrideAccess: true,
				data: {
					email: process.env.TEST_USER,
					password: process.env.TEST_PASS,
				},
			});
		}

		const pages = await payload.count({
			collection: "pages",
			overrideAccess: true,
		});

		if (pages.totalDocs === 0) {
			await payload.create({
				collection: "pages",
				overrideAccess: true,
				data: {
					title: "Home",
					content: defaultContent as Page["content"],
				},
			});
		}
	},
});
