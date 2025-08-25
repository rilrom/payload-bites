import { type Config, PayloadRequest } from "payload";

import { brokenLinks } from "./collections/brokenLinks.js";
import { BROKEN_LINKS_COLLECTION_SLUG } from "./constants.js";
import { defaultPluginOptions } from "./defaults.js";
import { endpoints } from "./endpoints/index.js";
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

    if (config.collections?.find((collection) => collection.slug === BROKEN_LINKS_COLLECTION_SLUG)) {
      throw new Error("[broken-link-checker]: The broken links collection already exists.");
    }

    config.custom = {
      ...(config.custom || {}),
      brokenLinkChecker: {
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

    config.collections = [
      ...(config.collections || []),
      {
        ...brokenLinks,
        access: {
          ...(brokenLinks.access || {}),
          read: (args) => mergedOptions.brokenLinksAccess?.(args) ?? Boolean(args.req.user),
        },
      },
    ];

    config.i18n = {
      ...(config.i18n || {}),
      translations: {
        ...deepMerge(translations, config.i18n?.translations),
      },
    };

    config.endpoints = [...(config.endpoints || []), ...endpoints];

    return config;
  };
