import { FullscreenEditorFeature } from "@payload-bites/fullscreen-editor";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const RichTextVariantFourBlock: Block = {
  slug: "rich-text-variant-four-block",
  fields: [
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          FullscreenEditorFeature(),
        ],
      }),
    },
  ],
};
