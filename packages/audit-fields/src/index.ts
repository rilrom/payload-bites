import type { Config } from "payload";

import { beforeChangeGlobalAuditField } from "./hooks/beforeChangeGlobalAuditField.js";
import { beforeChangeCollectionAuditField } from "./hooks/beforeChangeCollectionAuditField.js";
import { auditField } from "./fields/auditField.js";
import { defaultPluginOptions } from "./defaults.js";
import type { AuditFieldsPluginOptions } from "./types.js";

export const auditFieldsPlugin =
  (pluginOptions?: AuditFieldsPluginOptions) =>
  (incomingConfig: Config): Config => {
    const mergedOptions: Required<AuditFieldsPluginOptions> = Object.assign(
      defaultPluginOptions,
      pluginOptions,
    );

    const config = { ...incomingConfig };

    if (mergedOptions.enabled === false) {
      return config;
    }

    const usersSlug = config.admin?.user;

    if (!usersSlug) {
      throw new Error("[audit-fields]: User collection is required.");
    }

    config.collections = (config.collections || []).map((collection) => {
      if (mergedOptions.excludedCollections.includes(collection.slug)) {
        return collection;
      }

      const modifiedCollection = {
        ...collection,
      };

      modifiedCollection.hooks = {
        ...modifiedCollection.hooks,
        beforeChange: [
          ...(modifiedCollection.hooks?.beforeChange || []),
          beforeChangeCollectionAuditField(
            mergedOptions.createdByFieldName,
            mergedOptions.lastModifiedByFieldName,
            usersSlug,
          ),
        ],
      };

      modifiedCollection.fields = [
        ...modifiedCollection.fields,
        auditField({
          usersSlug,
          slug: modifiedCollection.slug,
          name: mergedOptions.createdByFieldName,
          label: mergedOptions.createdByLabel,
          showInSidebar: mergedOptions.showInSidebar,
          showEmptyFields: mergedOptions.showEmptyFields,
        }),
        auditField({
          usersSlug,
          slug: modifiedCollection.slug,
          name: mergedOptions.lastModifiedByFieldName,
          label: mergedOptions.lastModifiedByLabel,
          showInSidebar: mergedOptions.showInSidebar,
          showEmptyFields: mergedOptions.showEmptyFields,
        }),
      ];

      return modifiedCollection;
    });

    config.globals = (config.globals || []).map((global) => {
      if (mergedOptions.excludedCollections?.includes(global.slug)) {
        return global;
      }

      const modifiedGlobal = {
        ...global,
      };

      modifiedGlobal.hooks = {
        ...modifiedGlobal.hooks,
        beforeChange: [
          ...(modifiedGlobal.hooks?.beforeChange || []),
          beforeChangeGlobalAuditField(
            mergedOptions.createdByFieldName,
            mergedOptions.lastModifiedByFieldName,
            usersSlug,
          ),
        ],
      };

      modifiedGlobal.fields = [
        ...modifiedGlobal.fields,
        auditField({
          usersSlug,
          slug: modifiedGlobal.slug,
          name: mergedOptions.createdByFieldName,
          label: mergedOptions.createdByLabel,
          showInSidebar: mergedOptions.showInSidebar,
          showEmptyFields: mergedOptions.showEmptyFields,
        }),
        auditField({
          usersSlug,
          slug: modifiedGlobal.slug,
          name: mergedOptions.lastModifiedByFieldName,
          label: mergedOptions.lastModifiedByLabel,
          showInSidebar: mergedOptions.showInSidebar,
          showEmptyFields: mergedOptions.showEmptyFields,
        }),
      ];

      return modifiedGlobal;
    });

    return config;
  };
