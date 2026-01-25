import type { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import { describe, expect, it } from "vitest";
import { getConverterForNode } from "../../utils/converterSelection";
import { mockConverters } from "../fixtures/mockConverters";
import {
	mockBlockNode,
	mockHeadingNode,
	mockInlineBlockNode,
	mockParagraphNode,
} from "../fixtures/mockNodes";

describe("getConverterForNode", () => {
	describe("standard node types", () => {
		it("should return converter for paragraph node", () => {
			const converter = getConverterForNode(mockParagraphNode, mockConverters);

			expect(converter).toBe(mockConverters.paragraph);
		});

		it("should return converter for heading node", () => {
			const converter = getConverterForNode(mockHeadingNode, mockConverters);

			expect(converter).toBe(mockConverters.heading);
		});
	});

	describe("block nodes", () => {
		it("should return converter for block node with blockType", () => {
			const converter = getConverterForNode(mockBlockNode, mockConverters);

			expect(converter).toBe(mockConverters.blocks?.imageBlock);
		});

		it("should return undefined for block node with missing blockType", () => {
			const nodeWithoutBlockType = {
				type: "block",
				version: 1,
				fields: {},
			} as SerializedLexicalNode & { fields?: { blockType?: string } };

			const converter = getConverterForNode(
				nodeWithoutBlockType,
				mockConverters,
			);

			expect(converter).toBeUndefined();
		});

		it("should return undefined for block node with unknown blockType", () => {
			const nodeWithUnknownType = {
				type: "block",
				version: 1,
				fields: { blockType: "unknownBlock" },
			} as SerializedLexicalNode & { fields?: { blockType?: string } };

			const converter = getConverterForNode(
				nodeWithUnknownType,
				mockConverters,
			);

			expect(converter).toBeUndefined();
		});
	});

	describe("inlineBlock nodes", () => {
		it("should return converter for inlineBlock node with blockType", () => {
			const converter = getConverterForNode(
				mockInlineBlockNode,
				mockConverters,
			);

			expect(converter).toBe(mockConverters.inlineBlocks?.mentionBlock);
		});

		it("should return undefined for inlineBlock node with missing blockType", () => {
			const nodeWithoutBlockType = {
				type: "inlineBlock",
				version: 1,
				fields: {},
			} as SerializedLexicalNode & { fields?: { blockType?: string } };

			const converter = getConverterForNode(
				nodeWithoutBlockType,
				mockConverters,
			);

			expect(converter).toBeUndefined();
		});
	});

	describe("unknown node types", () => {
		it("should return undefined for unknown node type", () => {
			const unknownNode = {
				type: "unknownType",
				version: 1,
			} as SerializedLexicalNode;

			const converter = getConverterForNode(unknownNode, mockConverters);

			expect(converter).toBeUndefined();
		});
	});
});
