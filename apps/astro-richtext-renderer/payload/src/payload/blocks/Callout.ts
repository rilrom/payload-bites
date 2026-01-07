import type { Block } from "payload";

export const CalloutBlock: Block = {
  slug: "callout",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "info",
      options: [
        { label: "Info", value: "info" },
        { label: "Warning", value: "warning" },
        { label: "Error", value: "error" },
        { label: "Success", value: "success" },
      ],
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
  ],
};
