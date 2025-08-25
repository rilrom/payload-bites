"use client";

import type { ToolbarGroup, ToolbarGroupItem } from "@payloadcms/richtext-lexical";

export const toolbarFullscreenEditorGroupWithItems = (items: ToolbarGroupItem[]): ToolbarGroup => {
  return {
    type: "buttons",
    items,
    key: "fullscreenEditor",
    order: 9999,
  };
};
