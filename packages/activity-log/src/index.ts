import { type CollectionConfig, type Config, type GlobalConfig } from "payload";

import { activityLog } from "./collections/activityLog.js";
import { ACTIVITY_LOG_COLLECTION_SLUG } from "./constants.js";
import {
  defaultAuthCollection,
  defaultCreateLogging,
  defaultDeleteLogging,
  defaultDeviceInfoLogging,
  defaultIpAddressLogging,
  defaultPluginOptions,
  defaultUpdateLogging,
} from "./defaults.js";
import { afterChangeCollectionActivityLog } from "./hooks/afterChangeCollectionActivityLog.js";
import { afterChangeGlobalActivityLog } from "./hooks/afterChangeGlobalActivityLog.js";
import { afterDeleteCollectionActivityLog } from "./hooks/afterDeleteCollectionActivityLog.js";
import { type ActivityLogPluginOptions } from "./types.js";

export const activityLogPlugin =
  (pluginOptions?: ActivityLogPluginOptions) =>
  (incomingConfig: Config): Config => {
    const mergedOptions: Required<ActivityLogPluginOptions> = Object.assign(defaultPluginOptions, pluginOptions);

    const config = { ...incomingConfig };

    if (mergedOptions.enabled === false) {
      return config;
    }

    if (config.collections?.find((collection) => collection.slug === ACTIVITY_LOG_COLLECTION_SLUG)) {
      throw new Error("[activity-log]: The activity log collection already exists.");
    }

    config.collections = [
      ...(config.collections || []),
      {
        ...activityLog,
        ...(mergedOptions.admin?.group && {
          admin: {
            ...activityLog.admin,
            group: mergedOptions.admin.group,
          },
        }),
        labels: mergedOptions.labels ?? undefined,
        access: {
          create: () => false,
          read: (args) => mergedOptions.access?.read?.(args) ?? Boolean(args.req.user),
          update: (args) => mergedOptions.access?.update?.(args) ?? false,
          delete: (args) => mergedOptions.access?.delete?.(args) ?? false,
        },
        fields: [
          {
            name: "user",
            type: "relationship",
            relationTo: [config.admin?.user || defaultAuthCollection],
            admin: {
              allowCreate: false,
              allowEdit: false,
            },
          },
          ...activityLog.fields,
        ],
      },
    ];

    config.collections = (config.collections || []).map((collection) => {
      if (!Object.keys(mergedOptions.collections).includes(collection.slug)) {
        return collection;
      }

      const modifiedCollection: CollectionConfig = {
        ...collection,
      };

      const mergedCollectionOptions = mergedOptions.collections[modifiedCollection.slug];

      const enableCreateLogging = mergedCollectionOptions?.enableCreateLogging ?? defaultCreateLogging;
      const enableUpdateLogging = mergedCollectionOptions?.enableUpdateLogging ?? defaultUpdateLogging;
      const enableDeleteLogging = mergedCollectionOptions?.enableDeleteLogging ?? defaultDeleteLogging;
      const enableIpAddressLogging = mergedCollectionOptions?.enableIpAddressLogging ?? defaultIpAddressLogging;
      const enableDeviceInfoLogging = mergedCollectionOptions?.enableDeviceInfoLogging ?? defaultDeviceInfoLogging;
      const enableDraftAutosaveLogging =
        mergedOptions.enableDraftAutosaveLogging ?? defaultPluginOptions?.enableDraftAutosaveLogging;

      modifiedCollection.hooks = {
        ...(modifiedCollection.hooks || {}),
        afterChange: [
          ...(modifiedCollection.hooks?.afterChange || []),
          afterChangeCollectionActivityLog({
            enableCreateLogging,
            enableUpdateLogging,
            enableIpAddressLogging,
            enableDeviceInfoLogging,
            enableDraftAutosaveLogging,
          }),
        ],
        afterDelete: [
          ...(modifiedCollection.hooks?.afterDelete || []),
          afterDeleteCollectionActivityLog({
            enableDeleteLogging,
            enableIpAddressLogging,
            enableDeviceInfoLogging,
          }),
        ],
      };

      return modifiedCollection;
    });

    config.globals = (config.globals || []).map((global) => {
      if (!Object.keys(mergedOptions.globals).includes(global.slug)) {
        return global;
      }

      const modifiedGlobal: GlobalConfig = {
        ...global,
      };

      const mergedGlobalOptions = mergedOptions.collections[modifiedGlobal.slug];

      const enableIpAddressLogging = mergedGlobalOptions?.enableIpAddressLogging ?? defaultIpAddressLogging;
      const enableDeviceInfoLogging = mergedGlobalOptions?.enableDeviceInfoLogging ?? defaultDeviceInfoLogging;
      const enableDraftAutosaveLogging =
        mergedOptions.enableDraftAutosaveLogging ?? defaultPluginOptions?.enableDraftAutosaveLogging;

      modifiedGlobal.hooks = {
        ...(modifiedGlobal.hooks || {}),
        afterChange: [
          ...(modifiedGlobal.hooks?.afterChange || []),
          afterChangeGlobalActivityLog({
            enableIpAddressLogging,
            enableDeviceInfoLogging,
            enableDraftAutosaveLogging,
          }),
        ],
      };

      return modifiedGlobal;
    });

    return config;
  };
