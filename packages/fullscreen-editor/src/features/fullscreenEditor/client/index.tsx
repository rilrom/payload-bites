"use client";

import type { ToolbarGroup } from "@payloadcms/richtext-lexical";
import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { FullscreenIcon } from "../../../components/FullscreenIcon/index.js";
import {
	isFullscreen,
	toggleFullscreen,
} from "../../../utils/toggleFullscreen.js";
import { FullscreenEditorPlugin } from "./plugins/FullscreenEditorPlugin.js";
import { slashMenuViewGroupWithItems } from "./slashMenuViewGroupWithItems.js";
import { toolbarFullscreenEditorGroupWithItems } from "./toolbarFullscreenEditorGroup.js";

const fullscreenItem = {
	key: "toggleFullscreen",
	label: ({ i18n }: { i18n: { t: (key: string) => string } }) =>
		i18n.t("lexical:fullscreenEditor:label"),
	onSelect: ({ editor }: { editor: LexicalEditor }) =>
		toggleFullscreen({ editor }),
};

const slashMenuGroups = [
	slashMenuViewGroupWithItems([
		{
			...fullscreenItem,
			Icon: FullscreenIcon,
			keywords: ["fullscreen", "focus"],
		},
	]),
];

const toolbarGroups: ToolbarGroup[] = [
	toolbarFullscreenEditorGroupWithItems([
		{
			...fullscreenItem,
			ChildComponent: FullscreenIcon,
			isActive: ({ editor }) => isFullscreen(editor),
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
