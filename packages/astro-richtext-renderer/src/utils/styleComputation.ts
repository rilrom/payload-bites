import type { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import type { RichTextConfig } from "../types";

function mapFormatToTextAlign(format: string): string | undefined {
	const alignMap: Record<string, string> = {
		center: "center",
		end: "right",
		justify: "justify",
		right: "right",
		start: "left",
	};

	return alignMap[format];
}

function shouldDisableTextAlign(
	node: SerializedLexicalNode,
	config: RichTextConfig,
): boolean {
	const disableTextAlign = config.disableTextAlign;

	return (
		disableTextAlign === true ||
		(Array.isArray(disableTextAlign) && disableTextAlign.includes(node.type))
	);
}

function shouldDisableIndent(
	node: SerializedLexicalNode,
	config: RichTextConfig,
): boolean {
	const disableIndent = config.disableIndent;

	return (
		disableIndent === true ||
		(Array.isArray(disableIndent) && disableIndent.includes(node.type))
	);
}

export function computeNodeStyles(
	node: SerializedLexicalNode,
	config: RichTextConfig,
): Record<string, string> | undefined {
	const style: Record<string, string> = {};

	const nodeWithFormat = node as SerializedLexicalNode & { format?: string };

	if (!shouldDisableTextAlign(node, config) && nodeWithFormat.format) {
		const textAlign = mapFormatToTextAlign(nodeWithFormat.format);

		if (textAlign) {
			style.textAlign = textAlign;
		}
	}

	const nodeWithIndent = node as SerializedLexicalNode & { indent?: number };

	if (
		!shouldDisableIndent(node, config) &&
		nodeWithIndent.indent &&
		node.type !== "listitem"
	) {
		style.paddingInlineStart = `${Number(nodeWithIndent.indent) * 40}px`;
	}

	return Object.keys(style).length > 0 ? style : undefined;
}
