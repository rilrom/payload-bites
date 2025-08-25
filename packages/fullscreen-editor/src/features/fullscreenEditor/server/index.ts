import { createServerFeature } from "@payloadcms/richtext-lexical";

import { i18n } from "./i18n.js";

export const FullscreenEditorFeature = createServerFeature({
  feature: {
    ClientFeature: "@payload-bites/fullscreen-editor/client#FullscreenEditorFeatureClient",
    i18n,
  },
  key: "fullscreenEditor",
});
