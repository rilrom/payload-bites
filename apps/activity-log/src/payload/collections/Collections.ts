import type { CollectionConfig } from "payload";

export const Collections: CollectionConfig = {
  slug: "collections",
  fields: [
    {
      name: "text",
      type: "text",
      required: true,
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
