import type {
	DefaultNodeTypes,
	SerializedBlockNode,
	SerializedInlineBlockNode,
	SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface RichTextConfig {
	// Render without a container div
	disableContainer?: boolean;
	// Disable indentation for all nodes or specific node types
	disableIndent?: boolean | string[];
	// Disable text alignment for all nodes or specific node types
	disableTextAlign?: boolean | string[];
	// Convert internal document links to href strings
	internalDocToHref?: (args: { linkNode: SerializedLinkNode }) => string;
	// Additional custom configuration
	[key: string]: unknown;
}

interface BaseConverterProps<T> {
	node: T;
	converters: AstroConverters;
	config: RichTextConfig;
	style?: Record<string, string>;
	RenderNode: AstroComponentFactory;
}

export type AstroConverterProps<
	T extends SerializedLexicalNode = SerializedLexicalNode,
> = BaseConverterProps<T>;

export type AstroConverter<
	T extends { [key: string]: any; type?: string } = SerializedLexicalNode,
> =
	| ((args: BaseConverterProps<T>) => AstroComponentFactory)
	| AstroComponentFactory;

/** Payload 4 declares SerializedBlockNode as a distributive conditional type, so `infer` through it no longer recovers the fields (richtext-lexical features/blocks/server/schema.d.ts). */
type BlockTypeOf<T, TNodeType extends "block" | "inlineBlock"> = T extends {
	type: TNodeType;
	fields: { blockType: infer K };
}
	? K
	: never;

/** The block node members keep `blocks` and `inlineBlocks` typed when no generic is provided. */
type DefaultConverterNodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<{ blockName?: null | string; blockType: string }>
	| SerializedInlineBlockNode<{ blockName?: null | string; blockType: string }>;

type BlockConverters<T, TNodeType extends "block" | "inlineBlock"> = {
	[K in Extract<BlockTypeOf<T, TNodeType>, string>]?: AstroConverter<
		Extract<T, { type: TNodeType; fields: { blockType: K } }>
	>;
};

export type AstroConverters<
	T extends { [key: string]: any; type?: string } = DefaultConverterNodeTypes,
> = {
	[key: string]:
		| {
				[blockSlug: string]: AstroConverter<any>;
		  }
		| AstroConverter<any>
		| undefined;
} & {
	[nodeType in Exclude<
		NonNullable<T["type"]>,
		"block" | "inlineBlock"
	>]?: AstroConverter<Extract<T, { type: nodeType }>>;
} & {
	blocks?: BlockConverters<T, "block">;
	inlineBlocks?: BlockConverters<T, "inlineBlock">;
	unknown?: AstroConverter<SerializedLexicalNode>;
};

export type AstroConvertersFunction<
	T extends { [key: string]: any; type?: string } = DefaultConverterNodeTypes,
> = (args: {
	defaultConverters: AstroConverters<DefaultNodeTypes>;
}) => AstroConverters<T>;
