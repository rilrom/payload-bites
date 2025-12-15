import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
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
