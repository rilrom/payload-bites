import type { RichTextConfig } from "../../types";

export const defaultConfig: RichTextConfig = {
	disableContainer: false,
	disableIndent: false,
	disableTextAlign: false,
};

export const configWithDisabledTextAlign: RichTextConfig = {
	disableContainer: false,
	disableIndent: false,
	disableTextAlign: true,
};

export const configWithSelectiveTextAlign: RichTextConfig = {
	disableContainer: false,
	disableIndent: false,
	disableTextAlign: ["paragraph", "heading"],
};

export const configWithDisabledIndent: RichTextConfig = {
	disableContainer: false,
	disableIndent: true,
	disableTextAlign: false,
};

export const configWithSelectiveIndent: RichTextConfig = {
	disableContainer: false,
	disableIndent: ["quote"],
	disableTextAlign: false,
};
