import type { CollectionConfig } from "payload";

export const CollectionWithDrafts: CollectionConfig = {
  slug: "collection-with-drafts",
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "text",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "array",
      type: "array",
      fields: [
        {
          name: "key",
          type: "text",
        },
        {
          name: "value",
          type: "text",
        },
      ],
    },
  ],
};
