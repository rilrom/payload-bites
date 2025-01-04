import { FullscreenEditorFeature } from "@payload-bites/fullscreen-editor";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const RichTextVariantThreeBlock: Block = {
  slug: "rich-text-variant-three-block",
  fields: [
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FullscreenEditorFeature(),
        ],
      }),
    },
  ],
};
