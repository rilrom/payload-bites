import type { Block } from "payload";

export const RelationshipCardBlock: Block = {
  slug: "relationshipCard",
  fields: [
    {
      name: "relationTo",
      type: "text",
      required: true,
    },
    {
      name: "value",
      type: "json",
    },
  ],
};
