import type { AccessArgs, CollectionConfig, Config } from "payload";

import { endpoints } from "./endpoints/index.js";
import { deepMerge } from "./utils/deepMerge.js";
import { getSoftDeleteCookie } from "./utils/getSoftDeleteCookie.js";
import { defaultPluginOptions } from "./defaults.js";
import { translations } from "./translations.js";
import type { SoftDeletePluginOptions } from "./types.js";

export const softDeletePlugin =
  (pluginOptions?: SoftDeletePluginOptions) =>
  (incomingConfig: Config): Config => {
    const mergedOptions: Required<SoftDeletePluginOptions> = Object.assign(
      defaultPluginOptions,
      pluginOptions,
    );

    const config = { ...incomingConfig };

    config.admin = {
      ...(config.admin || {}),
      components: {
        ...(config.admin?.components || {}),
        providers: [
          ...(config.admin?.components?.providers || []),
          "@payload-bites/soft-delete/rsc#SoftDeleteProviderRsc",
        ],
      },
    };

    if (mergedOptions.enabled === false) {
      return config;
    }

    config.i18n = {
      ...(config.i18n || {}),
      translations: {
        ...deepMerge(translations, config.i18n?.translations),
      },
    };

    config.collections = (config.collections || []).map((collection) => {
      if (!mergedOptions.collections.includes(collection.slug)) {
        return collection;
      }

      const modifiedCollection: CollectionConfig = {
        ...collection,
      };

      modifiedCollection.admin = {
        ...modifiedCollection.admin,
        baseListFilter: (args) => {
          const softDeleteCookie = getSoftDeleteCookie(args.req.headers);

          if (softDeleteCookie === "true") {
            return {
              deletedAt: {
                exists: true,
              },
            };
          }

          return {
            deletedAt: {
              equals: null,
            },
          };
        },
        components: {
          ...(modifiedCollection.admin?.components || {}),
          beforeList: ["@payload-bites/soft-delete/client#ToggleButton"],
          beforeListTable: [
            "@payload-bites/soft-delete/client#BulkSoftDeleteButton",
            "@payload-bites/soft-delete/client#BulkDeleteButton",
            "@payload-bites/soft-delete/client#BulkRestoreButton",
          ],
        },
      };

      modifiedCollection.fields = [
        ...modifiedCollection.fields,
        {
          name: "deletedAt",
          type: "date",
          admin: {
            disableBulkEdit: true,
            disableListColumn: true,
            hidden: true,
          },
        },
        {
          name: "restoreButton",
          type: "ui",
          admin: {
            disableBulkEdit: true,
            disableListColumn: true,
            components: {
              Field: "@payload-bites/soft-delete/client#RestoreButton",
            },
          },
        },
        {
          name: "softDeleteButton",
          type: "ui",
          admin: {
            disableBulkEdit: true,
            disableListColumn: true,
            components: {
              Field: "@payload-bites/soft-delete/client#SoftDeleteButton",
            },
          },
        },
        {
          name: "deleteButton",
          type: "ui",
          admin: {
            disableBulkEdit: true,
            disableListColumn: true,
            components: {
              Field: "@payload-bites/soft-delete/client#DeleteButton",
            },
          },
        },
      ];

      modifiedCollection.access = {
        ...modifiedCollection.access,
        delete: () => false,
        update: (args) => {
          if (args?.data?.deletedAt) {
            return false;
          }

          return collection.access?.update?.(args) ?? Boolean(args.req.user);
        },
      };

      modifiedCollection.custom = {
        access: {
          softDeleteAccess: (args: AccessArgs) => {
            if (args?.data?.deletedAt) {
              return false;
            }

            return (
              mergedOptions.access[modifiedCollection.slug]?.softDeleteAccess ??
              Boolean(args.req.user)
            );
          },
          hardDeleteAccess: (args: AccessArgs) => {
            if (args?.data?.deletedAt === null) {
              return false;
            }

            return (
              mergedOptions.access[modifiedCollection.slug]?.hardDeleteAccess ??
              Boolean(args.req.user)
            );
          },
          restoreAccess: (args: AccessArgs) => {
            if (args?.data?.deletedAt === null) {
              return false;
            }

            return (
              mergedOptions.access[modifiedCollection.slug]?.restoreAccess ??
              Boolean(args.req.user)
            );
          },
        },
      };

      return modifiedCollection;
    });

    config.endpoints = [...(config.endpoints || []), ...endpoints];

    return config;
  };
