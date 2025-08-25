import { activityLogPlugin } from "@payload-bites/activity-log";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

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
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  plugins: [
    activityLogPlugin({
      enableDraftAutosaveLogging: false,
      collections: {
        collections: {},
        "collection-with-drafts": {},
      },
      globals: {
        globals: {},
        "global-with-drafts": {},
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
