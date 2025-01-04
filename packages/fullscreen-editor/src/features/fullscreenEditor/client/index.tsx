"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import type { ToolbarGroup } from "@payloadcms/richtext-lexical";

import { toolbarFullscreenEditorGroupWithItems } from "./toolbarFullscreenEditorGroup.js";
import { FullscreenEditorPlugin } from "./plugins/FullscreenEditorPlugin.js";
import { FullscreenIcon } from "../../../components/FullscreenIcon/index.js";

const toolbarGroups: ToolbarGroup[] = [
  toolbarFullscreenEditorGroupWithItems([
    {
      ChildComponent: FullscreenIcon,
      key: "toggleFullscreen",
      label: ({ i18n }) => {
        return i18n.t("lexical:fullscreen:label");
      },
      onSelect: ({ editor }) => {
        const body = document.body;
        const root = editor.getRootElement();
        const defaultTemplate = body.querySelector(".template-default");
        const richTextField = root?.closest(".rich-text-lexical");

        if (body.classList.contains("focus-mode")) {
          defaultTemplate?.setAttribute("style", "transition: none;");
          body.classList.remove("focus-mode");
          richTextField?.classList.remove("focused-editor");
          setTimeout(() => defaultTemplate?.removeAttribute("style"), 150);
        } else {
          body.classList.add("focus-mode");
          richTextField?.classList.add("focused-editor");
        }
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
