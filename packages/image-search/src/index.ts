import type { Config } from "payload";

import { translations } from "./translations.js";
import { deepMerge } from "./utils/deepMerge.js";
import { providers } from "./endpoints/providers.js";
import { defaultPluginOptions } from "./defaults.js";
import type { ImageSearchPluginOptions } from "./types.js";

export const imageSearchPlugin =
  (pluginOptions: ImageSearchPluginOptions = {}) =>
  (incomingConfig: Config): Config => {
    const mergedOptions: Required<ImageSearchPluginOptions> = Object.assign(
      defaultPluginOptions,
      pluginOptions,
    );

    const config = { ...incomingConfig };

    if (mergedOptions.enabled === false) {
      return config;
    }

    config.custom = {
      ...(config.custom || {}),
      providerAccess: mergedOptions.providerAccess,
    };

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

      return modifiedCollection;
    });

    config.endpoints = [...(config.endpoints || []), ...providers];

    return config;
  };
