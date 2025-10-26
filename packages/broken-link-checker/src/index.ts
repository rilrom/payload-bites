import { type Config, PayloadRequest } from "payload";

import { getBrokenLinksCollection } from "./collections/getBrokenLinksCollection.js";
import { defaultPluginOptions } from "./defaults.js";
import { endpoints } from "./endpoints/index.js";
import { tasks } from "./tasks/index.js";
import { translations } from "./translations.js";
import { type BrokenLinkCheckerPluginOptions } from "./types.js";
import { deepMerge } from "./utils/deepMerge.js";

export const brokenLinkCheckerPlugin =
  (pluginOptions?: BrokenLinkCheckerPluginOptions) =>
  (incomingConfig: Config): Config => {
    const mergedOptions: BrokenLinkCheckerPluginOptions = Object.assign(defaultPluginOptions, pluginOptions);

    const config = { ...incomingConfig };

    if (mergedOptions.enabled === false) {
      return config;
    }

    const brokenLinksCollection = getBrokenLinksCollection({ pluginOptions: mergedOptions });

    config.collections = [...(config.collections || []), brokenLinksCollection];

    config.custom = {
      ...(config.custom || {}),
      brokenLinkChecker: {
        slug: brokenLinksCollection.slug,
        scanLinksAccess: mergedOptions.scanLinksAccess,
        resolvedUrls: (args: { req: PayloadRequest }) =>
          Promise.all(
            Object.values(mergedOptions.collections).map((collection) => {
              const urlsOrFn = collection?.resolvedUrls;

              if (typeof urlsOrFn === "function") {
                return urlsOrFn(args);
              }

              return Promise.resolve(urlsOrFn);
            }),
          ).then((arrays) => arrays.flat()),
      },
    };

    config.i18n = {
      ...(config.i18n || {}),
      translations: {
        ...deepMerge(translations, config.i18n?.translations),
      },
    };

    config.endpoints = [...(config.endpoints || []), ...endpoints];

    config.jobs = {
      ...(config.jobs || {}),
      tasks: [...(config.jobs?.tasks || []), ...tasks],
    };

    return config;
  };
