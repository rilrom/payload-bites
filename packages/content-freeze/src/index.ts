import { type CollectionConfig, type Config, type GlobalConfig } from "payload";

import { defaultPluginOptions } from "./defaults.js";
import { getContentFreezeSettingsGlobal } from "./globals/getContentFreezeSettingsGlobal.js";
import { translations } from "./translations.js";
import { type ContentFreezePluginOptions } from "./types.js";
import { deepMerge } from "./utils/deepMerge.js";
import { wrapAccessControl } from "./utils/wrapAccessControl.js";

export const contentFreezePlugin =
  (pluginOptions?: ContentFreezePluginOptions) =>
  (incomingConfig: Config): Config => {
    const mergedOptions: ContentFreezePluginOptions = Object.assign(defaultPluginOptions, pluginOptions);

    const config = { ...incomingConfig };

    if (mergedOptions.enabled === false) {
      return config;
    }

    config.i18n = {
      ...(config.i18n || {}),
      translations: {
        ...deepMerge(translations, config.i18n?.translations),
      },
    };

    const contentFreezeSettingsGlobal = getContentFreezeSettingsGlobal({
      pluginOptions: mergedOptions,
      collectionSlugs: (config.collections || []).map((c) => c.slug),
      globalSlugs: (config.globals || []).map((g) => g.slug),
    });

    config.admin = {
      ...(config.admin || {}),
      components: {
        ...(config.admin?.components || {}),
        header: [
          {
            path: "@payload-bites/content-freeze/rsc#ContentFreezeBannerRsc",
            serverProps: {
              slug: contentFreezeSettingsGlobal.slug,
            },
          },
          ...(config.admin?.components?.header || []),
        ],
      },
    };

    config.collections = (config.collections || []).map((collection) => {
      const modifiedCollection: CollectionConfig = {
        ...collection,
      };

      modifiedCollection.access = {
        ...modifiedCollection.access,
        create: wrapAccessControl(
          modifiedCollection.access?.create,
          contentFreezeSettingsGlobal.slug,
          collection.slug,
          "collection",
        ),
        update: wrapAccessControl(
          modifiedCollection.access?.update,
          contentFreezeSettingsGlobal.slug,
          collection.slug,
          "collection",
        ),
        delete: wrapAccessControl(
          modifiedCollection.access?.delete,
          contentFreezeSettingsGlobal.slug,
          collection.slug,
          "collection",
        ),
      };

      return modifiedCollection;
    });

    config.globals = (config.globals || []).map((global) => {
      const modifiedGlobal: GlobalConfig = {
        ...global,
      };

      modifiedGlobal.access = {
        ...modifiedGlobal.access,
        update: wrapAccessControl(
          modifiedGlobal.access?.update,
          contentFreezeSettingsGlobal.slug,
          global.slug,
          "global",
        ),
      };

      return modifiedGlobal;
    });

    config.globals = [...(config.globals || []), contentFreezeSettingsGlobal];

    return config;
  };
