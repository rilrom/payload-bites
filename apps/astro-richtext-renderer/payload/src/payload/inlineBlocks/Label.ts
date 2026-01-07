import type { Block } from "payload";

export const LabelInlineBlock: Block = {
  slug: "label",
  fields: [
    {
      name: "text",
      type: "text",
      required: true,
    },
    {
      name: "color",
      type: "select",
      defaultValue: "blue",
      options: [
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
        { label: "Red", value: "red" },
        { label: "Yellow", value: "yellow" },
        { label: "Purple", value: "purple" },
        { label: "Gray", value: "gray" },
      ],
    },
  ],
};
