import type { Block } from "payload";

export const MathInlineBlock: Block = {
  slug: "math",
  fields: [
    {
      name: "expression",
      type: "text",
      required: true,
    },
    {
      name: "displayMode",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
