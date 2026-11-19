import type {
	SerializedBlockNode,
	SerializedInlineBlockNode,
} from "@payloadcms/richtext-lexical";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { describe, expectTypeOf, it } from "vitest";
import type { AstroConverters } from "../../types";

type NumberBlockNode = SerializedBlockNode<{
	blockType: "numberBlock";
	number: number;
}>;

type TextBlockNode = SerializedBlockNode<{
	blockType: "textBlock";
	text: string;
}>;

type MentionInlineBlockNode = SerializedInlineBlockNode<{
	blockType: "mention";
	username: string;
}>;

type Converters = AstroConverters<
	NumberBlockNode | TextBlockNode | MentionInlineBlockNode
>;

type ConverterNode<TConverter> =
	Exclude<NonNullable<TConverter>, AstroComponentFactory> extends (
		args: infer TArgs extends { node: unknown },
	) => unknown
		? TArgs["node"]
		: never;

type BlockConverters = NonNullable<Converters["blocks"]>;
type InlineBlockConverters = NonNullable<Converters["inlineBlocks"]>;

describe("AstroConverters types", () => {
	it("keys block converters by blockType", () => {
		expectTypeOf<keyof BlockConverters>().toEqualTypeOf<
			"numberBlock" | "textBlock"
		>();
		expectTypeOf<keyof InlineBlockConverters>().toEqualTypeOf<"mention">();
	});

	it("passes the matching block node to each block converter", () => {
		type NumberNode = ConverterNode<BlockConverters["numberBlock"]>;

		expectTypeOf<NumberNode>().not.toBeAny();
		expectTypeOf<NumberNode>().not.toBeNever();
		expectTypeOf<NumberNode>().toEqualTypeOf<NumberBlockNode>();
		expectTypeOf<NumberNode["fields"]["number"]>().toEqualTypeOf<number>();
	});

	it("passes the matching inline block node to each inline block converter", () => {
		type MentionNode = ConverterNode<InlineBlockConverters["mention"]>;

		expectTypeOf<MentionNode>().not.toBeAny();
		expectTypeOf<MentionNode>().not.toBeNever();
		expectTypeOf<MentionNode>().toEqualTypeOf<MentionInlineBlockNode>();
		expectTypeOf<MentionNode["fields"]["username"]>().toEqualTypeOf<string>();
	});

	it("accepts any block slug when no generic is provided", () => {
		expectTypeOf<
			keyof NonNullable<AstroConverters["blocks"]>
		>().toEqualTypeOf<string>();
	});
});
