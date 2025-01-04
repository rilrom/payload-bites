import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const RichTextVariantOneBlock: Block = {
  slug: "rich-text-variant-one-block",
  fields: [
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({}),
    },
  ],
};
