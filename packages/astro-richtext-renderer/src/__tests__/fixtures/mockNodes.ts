import type {
	SerializedBlockNode,
	SerializedHeadingNode,
	SerializedInlineBlockNode,
	SerializedTextNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedParagraphNode } from "@payloadcms/richtext-lexical/lexical";
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

export const mockBlockNode: SerializedBlockNode<{ blockType: "imageBlock" }> = {
	type: "block",
	version: 1,
	format: "",
	fields: {
		id: "65f0c0ffee0000000000b10c",
		blockName: null,
		blockType: "imageBlock",
	},
};

export const mockInlineBlockNode: SerializedInlineBlockNode<{
	blockType: "mentionBlock";
}> = {
	type: "inlineBlock",
	version: 1,
	fields: {
		id: "65f0c0ffee0000000000b10d",
		blockType: "mentionBlock",
	},
};

const mockImageDoc = {
	id: 1,
	filename: "hero.jpg",
	filesize: 204800,
	height: 1200,
	mimeType: "image/jpeg",
	url: "/media/hero.jpg",
	width: 1600,
};

const mockImageSizes = {
	thumbnail: {
		filename: "hero-400x300.jpg",
		filesize: 12000,
		height: 300,
		mimeType: "image/jpeg",
		url: "/media/hero-400x300.jpg",
		width: 400,
	},
	tablet: {
		filename: "hero-1024x768.webp",
		filesize: 64000,
		height: 768,
		mimeType: "image/webp",
		url: "/media/hero-1024x768.webp",
		width: 1024,
	},
};

export const mockUploadDocWithVariants = {
	...mockImageDoc,
	variants: mockImageSizes,
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
