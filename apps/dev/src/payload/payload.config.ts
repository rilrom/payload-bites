import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { en } from "@payloadcms/translations/languages/en";
import { it } from "@payloadcms/translations/languages/it";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { imageSearchPlugin } from "@payload-bites/image-search";
import { auditFieldsPlugin } from "@payload-bites/audit-fields";
import { FullscreenEditorFeature } from "@payload-bites/fullscreen-editor";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Footer } from "./globals/Footer";
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
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { en, it },
  },
  collections: [Posts, RichTextVariations, Media, Users],
  globals: [Footer],
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
  plugins: [auditFieldsPlugin(), imageSearchPlugin()],
});
