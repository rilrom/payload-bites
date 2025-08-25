import { brokenLinkCheckerPlugin } from "@payload-bites/broken-link-checker";
import { resolveNestedDocUrls } from "@payload-bites/broken-link-checker/utilities";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

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
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { en, es },
  },
  localization: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
  serverURL: "http://localhost:3000",
  collections: [Pages, Users],
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
      InlineToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    ],
  }),
  plugins: [
    nestedDocsPlugin({
      collections: ["pages"],
      generateURL: (docs) => {
        return docs.reduce((url, doc) => `${url}/${doc.slug}`, "");
      },
    }),
    brokenLinkCheckerPlugin({
      collections: {
        pages: {
          resolvedUrls: async (args) => {
            return resolveNestedDocUrls({
              req: args.req,
              collection: "pages",
            });
          },
        },
      },
    }),
  ],
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
