import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "@/payload/collections/Media";
import { Pages } from "./collections/Pages";
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
	collections: [Pages, Media, Users],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	serverURL: process.env.PAYLOAD_SERVER_URL,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
	}),
	sharp,
	onInit: async (payload) => {
		const response = await payload.find({
			collection: "users",
			where: {
				email: {
					equals: process.env.TEST_USER!,
				},
			},
		});

		if (response?.docs?.length === 0) {
			await payload.create({
				collection: "users",
				data: {
					email: process.env.TEST_USER!,
					password: process.env.TEST_PASS!,
				},
			});
		}
	},
});
