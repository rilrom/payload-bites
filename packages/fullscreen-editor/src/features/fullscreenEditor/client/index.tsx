"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import type { ToolbarGroup } from "@payloadcms/richtext-lexical";

import { toolbarFullscreenEditorGroupWithItems } from "./toolbarFullscreenEditorGroup.js";
import { slashMenuViewGroupWithItems } from "./slashMenuViewGroupWithItems.js";
import { FullscreenEditorPlugin } from "./plugins/FullscreenEditorPlugin.js";
import { FullscreenButton } from "../../../components/FullscreenButton/index.js";
import { FullscreenIcon } from "../../../components/FullscreenIcon/index.js";
import { toggleFullscreen } from "../../../utils/toggleFullscreen.js";

const slashMenuGroups = [
  slashMenuViewGroupWithItems([
    {
      Icon: FullscreenIcon,
      key: "toggleFullscreen",
      keywords: ["fullscreen", "focus"],
      label: ({ i18n }) => {
        return i18n.t("lexical:fullscreenEditor:label");
      },
      onSelect: ({ editor }) => toggleFullscreen({ editor }),
    },
  ]),
];

const toolbarGroups: ToolbarGroup[] = [
  toolbarFullscreenEditorGroupWithItems([
    {
      Component: FullscreenButton,
      key: "toggleFullscreen",
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
  slashMenu: {
    groups: slashMenuGroups,
  },
  toolbarFixed: {
    groups: toolbarGroups,
  },
});
