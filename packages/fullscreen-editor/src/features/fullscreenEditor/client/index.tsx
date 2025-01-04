"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import type { ToolbarGroup } from "@payloadcms/richtext-lexical";

import { toolbarFullscreenEditorGroupWithItems } from "./toolbarFullscreenEditorGroup.js";
import { FullscreenEditorPlugin } from "./plugins/FullscreenEditorPlugin.js";
import { FullscreenButton } from "../../../components/FullscreenButton/index.js";

const toolbarGroups: ToolbarGroup[] = [
  toolbarFullscreenEditorGroupWithItems([
    {
      Component: FullscreenButton,
      key: "toggleFullscreen",
      label: ({ i18n }) => {
        return i18n.t("lexical:fullscreen:label");
      },
      order: 1,
    },
  ]),
];

export const FullscreenEditorFeatureClient = createClientFeature({
  plugins: [
    {
      Component: FullscreenEditorPlugin,
      position: "normal",
    },
  ],
  toolbarFixed: {
    groups: toolbarGroups,
  },
});
