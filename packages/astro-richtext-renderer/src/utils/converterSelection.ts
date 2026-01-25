import type { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import type { AstroConverter, AstroConverters } from "../types";

export function getConverterForNode(
	node: SerializedLexicalNode,
	converters: AstroConverters,
): AstroConverter<any> | undefined {
	if (node.type === "block") {
		const blockNode = node as SerializedLexicalNode & {
			fields?: { blockType?: string };
		};

		return converters.blocks?.[blockNode.fields?.blockType ?? ""];
	}

	if (node.type === "inlineBlock") {
		const inlineBlockNode = node as SerializedLexicalNode & {
			fields?: { blockType?: string };
		};

		return converters.inlineBlocks?.[inlineBlockNode.fields?.blockType ?? ""];
	}

	return converters[node.type] as AstroConverter<any>;
}
