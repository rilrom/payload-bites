import type { AuditFieldsPluginOptions } from "./types.js";

export const defaultPluginOptions: Required<AuditFieldsPluginOptions> = {
  enabled: true,
  excludedCollections: [],
  excludedGlobals: [],
  createdByFieldName: "createdBy",
  lastModifiedByFieldName: "lastModifiedBy",
  createdByLabel: "Created By",
  lastModifiedByLabel: "Last Modified By",
  showInSidebar: true,
  showEmptyFields: false,
};
