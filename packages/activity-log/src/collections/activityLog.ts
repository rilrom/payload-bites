import { type CollectionConfig } from "payload";

import { ACTIVITY_LOG_COLLECTION_SLUG } from "../constants.js";

export const activityLog: CollectionConfig = {
  slug: ACTIVITY_LOG_COLLECTION_SLUG,
  admin: {
    defaultColumns: ["timestamp", "user", "operation", "resource", "documentId"],
    disableCopyToLocale: true,
    enableRichTextLink: false,
    enableRichTextRelationship: false,
  },
  disableDuplicate: true,
  timestamps: false,
  fields: [
    {
      name: "operation",
      type: "select",
      options: [
        {
          value: "create",
          label: "Create",
        },
        {
          value: "read",
          label: "Read",
        },
        {
          value: "update",
          label: "Update",
        },
        {
          value: "delete",
          label: "Delete",
        },
      ],
    },
    {
      name: "timestamp",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      defaultValue: () => new Date(),
    },
    {
      name: "ipAddress",
      type: "text",
    },
    {
      name: "deviceInfo",
      type: "text",
    },
    {
      name: "locale",
      type: "text",
    },
    {
      name: "resource",
      type: "text",
    },
    {
      name: "documentId",
      type: "text",
    },
    {
      name: "data",
      type: "json",
    },
  ],
} as const;
