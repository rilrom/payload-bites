import type { Config } from "payload";

import { translations } from "./translations.js";
import { deepMerge } from "./utils/deepMerge.js";
import { providers } from "./endpoints/providers.js";

export type ImageSearchPluginOptions = {
  enabled?: boolean;
};

export const imageSearchPlugin =
  (pluginOptions: ImageSearchPluginOptions = {}) =>
  (incomingConfig: Config): Config => {
    const config = { ...incomingConfig };

    config.admin = {
      ...(config.admin || {}),
      components: {
        ...(config.admin?.components || {}),
      },
    };

    if (pluginOptions.enabled === false) {
      return config;
    }

    config.i18n = {
      ...(config.i18n || {}),
      translations: {
        ...deepMerge(translations, config.i18n?.translations),
      },
    };

    config.collections = (config.collections || []).map((collection) => {
      const modifiedCollection = {
        ...collection,
        admin: {
          ...(collection.admin || {}),

          components: {
            ...(collection.admin?.components || {}),
            edit: {
              Upload: "@payload-bites/image-search/client#CustomUpload",
            },
          },
        },
      };

      modifiedCollection.fields = (modifiedCollection.fields || []).map(
        (field) => {
          const newField = { ...field };
          return newField;
        },
      );

      return modifiedCollection;
    });

    config.endpoints = [...(config.endpoints || []), ...providers];

    config.globals = [...(config.globals || [])];

    config.hooks = {
      ...(config.hooks || {}),
    };

    config.onInit = async (payload) => {
      if (incomingConfig.onInit) {
        await incomingConfig.onInit(payload);
      }
    };

    return config;
  };
