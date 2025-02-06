import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { FullscreenEditorFeature } from "@payload-bites/fullscreen-editor";
import type { Block as PayloadBlock } from "payload";

export const Block: PayloadBlock = {
  slug: "block",
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
