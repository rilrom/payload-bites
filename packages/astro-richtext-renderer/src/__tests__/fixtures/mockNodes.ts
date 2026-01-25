import type {
	SerializedHeadingNode,
	SerializedTextNode,
} from "@payloadcms/richtext-lexical";
import type {
	SerializedLexicalNode,
	SerializedParagraphNode,
} from "@payloadcms/richtext-lexical/lexical";
import type { SerializedListItemNode } from "@payloadcms/richtext-lexical/lexical/list";

export const mockParagraphNode = {
	type: "paragraph",
	version: 1,
	children: [],
	direction: null,
	format: "",
	indent: 0,
	textFormat: 0,
	textStyle: "",
} as SerializedParagraphNode;

export const mockHeadingNode = {
	type: "heading",
	version: 1,
	tag: "h1",
	children: [],
	direction: null,
	format: "",
	indent: 0,
} as SerializedHeadingNode;

export const mockTextNode = {
	type: "text",
	version: 1,
	text: "Hello world",
	format: 0,
	detail: 0,
	mode: "normal",
	style: "",
} as SerializedTextNode;

export const mockBlockNode = {
	type: "block",
	version: 1,
	fields: {
		blockType: "imageBlock",
	},
	children: [],
} as SerializedLexicalNode & {
	fields?: { blockType?: string };
};

export const mockInlineBlockNode = {
	type: "inlineBlock",
	version: 1,
	fields: {
		blockType: "mentionBlock",
	},
	children: [],
} as SerializedLexicalNode & {
	fields?: { blockType?: string };
};

export const mockNodeWithFormat = {
	type: "paragraph",
	version: 1,
	format: "center",
	children: [],
	direction: null,
	indent: 0,
	textFormat: 0,
	textStyle: "",
} as SerializedParagraphNode;

export const mockNodeWithIndent = {
	type: "paragraph",
	version: 1,
	indent: 2,
	children: [],
	direction: null,
	format: "",
	textFormat: 0,
	textStyle: "",
} as SerializedParagraphNode;

export const mockListItemNode = {
	type: "listitem",
	version: 1,
	indent: 1,
	children: [],
	direction: null,
	format: "",
	value: 1,
	checked: undefined,
} as SerializedListItemNode;
