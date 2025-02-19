import type { AccessArgs, CollectionConfig, Config } from "payload";

import { endpoints } from "./endpoints/index.js";
import { deepMerge } from "./utils/deepMerge.js";
import { combinedBaseListFilter } from "./utils/combinedBaseListFilter.js";
import { defaultAccessControl, defaultPluginOptions } from "./defaults.js";
import { translations } from "./translations.js";
import type { SoftDeletePluginOptions } from "./types.js";

export const softDeletePlugin =
  (pluginOptions?: SoftDeletePluginOptions) =>
  (incomingConfig: Config): Config => {
    const mergedOptions: SoftDeletePluginOptions = Object.assign(
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
      if (!Object.keys(mergedOptions.collections).includes(collection.slug)) {
        return collection;
      }

      const modifiedCollection: CollectionConfig = {
        ...collection,
      };

      const enableHardDelete =
        mergedOptions.collections?.[collection.slug]?.enableHardDelete ?? true;
      const enableRestore =
        mergedOptions.collections?.[collection.slug]?.enableRestore ?? true;

      modifiedCollection.admin = {
        ...modifiedCollection?.admin,
        baseListFilter: combinedBaseListFilter(
          modifiedCollection?.admin?.baseListFilter,
        ),
        components: {
          ...(modifiedCollection.admin?.components || {}),
          beforeList: ["@payload-bites/soft-delete/client#ToggleButton"],
          beforeListTable: [
            "@payload-bites/soft-delete/client#BulkSoftDeleteButton",
            {
              path: "@payload-bites/soft-delete/client#BulkDeleteButton",
              clientProps: {
                enabled: enableHardDelete,
              },
            },
            {
              path: "@payload-bites/soft-delete/client#BulkRestoreButton",
              clientProps: {
                enabled: enableRestore,
              },
            },
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
            custom: {
              enabled: enableRestore,
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
            custom: {
              enabled: enableHardDelete,
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
        ...modifiedCollection.custom,
        softDelete: {
          enableHardDelete,
          enableRestore,
          softDeleteAccess: (args: AccessArgs) => {
            if (args?.data?.deletedAt) {
              return false;
            }

            return (
              mergedOptions.collections?.[collection.slug]?.softDeleteAccess?.(
                args,
              ) ?? defaultAccessControl(args)
            );
          },
          hardDeleteAccess: (args: AccessArgs) => {
            if (args?.data?.deletedAt === null) {
              return false;
            }

            if (enableHardDelete === false) {
              return false;
            }

            return (
              mergedOptions.collections?.[collection.slug]?.hardDeleteAccess?.(
                args,
              ) ?? defaultAccessControl(args)
            );
          },
          restoreAccess: (args: AccessArgs) => {
            if (args?.data?.deletedAt === null) {
              return false;
            }

            if (enableRestore === false) {
              return false;
            }

            return (
              mergedOptions.collections?.[collection.slug]?.restoreAccess?.(
                args,
              ) ?? defaultAccessControl(args)
            );
          },
        },
      };

      return modifiedCollection;
    });

    config.endpoints = [...(config.endpoints || []), ...endpoints];

    return config;
  };
