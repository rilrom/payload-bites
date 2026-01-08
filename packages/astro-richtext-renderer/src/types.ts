import type {
	DefaultNodeTypes,
	SerializedBlockNode,
	SerializedInlineBlockNode,
	SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type {
	JsonObject,
	TypedUploadCollection,
	UploadCollectionSlug,
} from "payload";

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

export type AstroConverters<
	T extends { [key: string]: any; type?: string } =
		| DefaultNodeTypes
		| SerializedBlockNode<{ blockName?: null | string; blockType: string }> // need these to ensure types for blocks and inlineBlocks work if no generics are provided
		| SerializedInlineBlockNode<{
				blockName?: null | string;
				blockType: string;
		  }>, // need these to ensure types for blocks and inlineBlocks work if no generics are provided
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
	blocks?: {
		[K in Extract<
			Extract<T, { type: "block" }> extends SerializedBlockNode<infer B>
				? B extends { blockType: string }
					? B["blockType"]
					: never
				: never,
			string
		>]?: AstroConverter<
			Extract<T, { type: "block" }> extends SerializedBlockNode<infer B>
				? SerializedBlockNode<Extract<B, { blockType: K }>>
				: SerializedBlockNode
		>;
	};
	inlineBlocks?: {
		[K in Extract<
			Extract<T, { type: "inlineBlock" }> extends SerializedInlineBlockNode<
				infer B
			>
				? B extends { blockType: string }
					? B["blockType"]
					: never
				: never,
			string
		>]?: AstroConverter<
			Extract<T, { type: "inlineBlock" }> extends SerializedInlineBlockNode<
				infer B
			>
				? SerializedInlineBlockNode<Extract<B, { blockType: K }>>
				: SerializedInlineBlockNode
		>;
	};
	unknown?: AstroConverter<SerializedLexicalNode>;
};

export type AstroConvertersFunction<
	T extends { [key: string]: any; type?: string } =
		| DefaultNodeTypes
		| SerializedBlockNode<{ blockName?: null | string }>
		| SerializedInlineBlockNode<{ blockName?: null | string }>,
> = (args: {
	defaultConverters: AstroConverters<DefaultNodeTypes>;
}) => AstroConverters<T>;

/**
 * @see https://github.com/payloadcms/payload/blob/main/packages/richtext-lexical/src/features/upload/server/nodes/UploadNode.tsx
 *
 * UploadDataImproved is a more precise type, and will replace UploadData in Payload v4.
 * This type is for internal use only as it will be deprecated in the future.
 * @internal
 *
 * @todo Replace UploadData with UploadDataImproved in 4.0
 */
export type UploadDataImproved<
	TUploadExtraFieldsData extends JsonObject = JsonObject,
> = {
	[TCollectionSlug in UploadCollectionSlug]: {
		fields: TUploadExtraFieldsData;
		/**
		 * Every lexical node that has sub-fields needs to have a unique ID. This is the ID of this upload node, not the ID of the linked upload document
		 */
		id: string;
		relationTo: TCollectionSlug;
		/**
		 * Value can be just the document ID, or the full, populated document
		 */
		value: number | string | TypedUploadCollection[TCollectionSlug];
	};
}[UploadCollectionSlug];
