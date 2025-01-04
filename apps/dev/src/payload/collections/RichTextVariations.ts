import { FullscreenEditorFeature } from "@payload-bites/fullscreen-editor";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const RichTextVariations: CollectionConfig = {
  slug: "rich-text-variations",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "richTextVariantOne",
      type: "richText",
    },
    {
      name: "richTextVariantTwo",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
        ],
      }),
    },
    {
      name: "richTextVariantThree",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FullscreenEditorFeature(),
        ],
      }),
    },
    {
      name: "richTextVariantFour",
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
