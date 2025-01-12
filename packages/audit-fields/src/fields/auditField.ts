import type { Field } from "payload";

import { resolveValue } from "../utils/resolveValue.js";
import type { AuditFieldLabel, AuditFieldsPluginOptions } from "../types.js";

interface AuditFieldParams {
  usersSlug: string;
  slug: string;
  name: string;
  label: AuditFieldLabel;
  showInSidebar: AuditFieldsPluginOptions["showInSidebar"];
  showEmptyFields: AuditFieldsPluginOptions["showEmptyFields"];
}

export const auditField = ({
  usersSlug,
  slug,
  name,
  label,
  showInSidebar,
  showEmptyFields,
}: AuditFieldParams): Field => {
  return {
    name: name,
    label: resolveValue(label, slug),
    type: "relationship",
    relationTo: [usersSlug],
    maxDepth: 0,
    admin: {
      allowCreate: false,
      allowEdit: false,
      readOnly: true,
      position: showInSidebar ? "sidebar" : undefined,
      condition: (data, _, { user }) => {
        return Boolean(user) && (showEmptyFields || Boolean(data?.[name]));
      },
    },
  };
};
