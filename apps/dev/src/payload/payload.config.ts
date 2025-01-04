import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { imageSearchPlugin } from "@payload-bites/image-search";
import { FullscreenEditorFeature } from "@payload-bites/fullscreen-editor";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { RichTextVariations } from "./collections/RichTextVariations";
import { RichTextVariantOneBlock } from "./blocks/RichTextVariantOneBlock";
import { RichTextVariantTwoBlock } from "./blocks/RichTextVariantTwoBlock";
import { RichTextVariantThreeBlock } from "./blocks/RichTextVariantThreeBlock";
import { RichTextVariantFourBlock } from "./blocks/RichTextVariantFourBlock";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Posts, RichTextVariations, Media, Users],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      FullscreenEditorFeature(),
      BlocksFeature({
        blocks: [
          RichTextVariantOneBlock,
          RichTextVariantTwoBlock,
          RichTextVariantThreeBlock,
          RichTextVariantFourBlock,
        ],
      }),
    ],
  }),
  sharp,
  plugins: [imageSearchPlugin()],
});
