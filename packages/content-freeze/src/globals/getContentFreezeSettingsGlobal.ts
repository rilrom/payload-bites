import { TFunction } from "@payloadcms/translations";
import { type GlobalConfig } from "payload";

import { translations, type TranslationsKeys } from "../translations.js";
import { type ContentFreezePluginOptions } from "../types.js";

export const getContentFreezeSettingsGlobal = ({
  pluginOptions,
  collectionSlugs,
  globalSlugs,
}: {
  pluginOptions: ContentFreezePluginOptions;
  collectionSlugs: string[];
  globalSlugs: string[];
}): GlobalConfig => {
  let global: GlobalConfig = {
    slug: "content-freeze-settings",
    admin: {
      group: {
        en: translations.en.contentFreeze.settingsLabel,
      },
    },
    fields: [
      {
        name: "enableContentFreeze",
        type: "checkbox",
        label: (args) => {
          return (args.t as TFunction<TranslationsKeys>)("contentFreeze:enableContentFreezeLabel");
        },
        defaultValue: false,
        admin: {
          description: (args) => {
            return (args.t as TFunction<TranslationsKeys>)("contentFreeze:enableContentFreezeDescription");
          },
        },
      },
      {
        type: "row",
        fields: [
          {
            name: "collections",
            type: "select",
            hasMany: true,
            options: collectionSlugs.map((slug) => ({
              label: slug,
              value: slug,
            })),
            admin: {
              description: (args) => {
                return (args.t as TFunction<TranslationsKeys>)("contentFreeze:collectionsDescription");
              },
            },
          },
          {
            name: "globals",
            type: "select",
            hasMany: true,
            options: globalSlugs.map((slug) => ({
              label: slug,
              value: slug,
            })),
            admin: {
              description: (args) => {
                return (args.t as TFunction<TranslationsKeys>)("contentFreeze:globalsDescription");
              },
            },
          },
        ],
      },
      {
        name: "message",
        type: "textarea",
        label: (args) => {
          return (args.t as TFunction<TranslationsKeys>)("contentFreeze:messageLabel");
        },
        admin: {
          description: (args) => {
            return (args.t as TFunction<TranslationsKeys>)("contentFreeze:messageDescription");
          },
        },
      },
    ],
  };

  if (
    pluginOptions?.overrideContentFreezeSettingsGlobal &&
    typeof pluginOptions.overrideContentFreezeSettingsGlobal === "function"
  ) {
    global = pluginOptions.overrideContentFreezeSettingsGlobal(global);
  }

  return global;
};
