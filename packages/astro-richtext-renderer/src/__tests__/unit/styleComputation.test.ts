import type { SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import { describe, expect, it } from "vitest";
import { computeNodeStyles } from "../../utils/styleComputation";
import {
	configWithDisabledIndent,
	configWithDisabledTextAlign,
	configWithSelectiveIndent,
	configWithSelectiveTextAlign,
	defaultConfig,
} from "../fixtures/mockConfig";
import {
	mockListItemNode,
	mockNodeWithFormat,
	mockNodeWithIndent,
} from "../fixtures/mockNodes";

describe("computeNodeStyles", () => {
	describe("text alignment", () => {
		it("should compute textAlign center", () => {
			const node = { ...mockNodeWithFormat, format: "center" };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toEqual({ textAlign: "center" });
		});

		it("should compute textAlign right for end format", () => {
			const node = { ...mockNodeWithFormat, format: "end" };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toEqual({ textAlign: "right" });
		});

		it("should compute textAlign right for right format", () => {
			const node = { ...mockNodeWithFormat, format: "right" };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toEqual({ textAlign: "right" });
		});

		it("should compute textAlign justify", () => {
			const node = { ...mockNodeWithFormat, format: "justify" };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toEqual({ textAlign: "justify" });
		});

		it("should compute textAlign left for start format", () => {
			const node = { ...mockNodeWithFormat, format: "start" };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toEqual({ textAlign: "left" });
		});

		it("should return undefined for node without format", () => {
			const node = { type: "paragraph", version: 1, children: [] };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toBeUndefined();
		});

		it("should ignore unknown format values", () => {
			const node = { ...mockNodeWithFormat, format: "unknown" };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toBeUndefined();
		});
	});

	describe("disableTextAlign config", () => {
		it("should skip textAlign when globally disabled", () => {
			const node = { ...mockNodeWithFormat, format: "center" };

			const styles = computeNodeStyles(node, configWithDisabledTextAlign);

			expect(styles).toBeUndefined();
		});

		it("should skip textAlign for specific node types", () => {
			const node = {
				...mockNodeWithFormat,
				type: "paragraph",
				format: "center",
			};

			const styles = computeNodeStyles(node, configWithSelectiveTextAlign);

			expect(styles).toBeUndefined();
		});

		it("should apply textAlign for non-disabled node types", () => {
			const node = { ...mockNodeWithFormat, type: "quote", format: "center" };

			const styles = computeNodeStyles(node, configWithSelectiveTextAlign);

			expect(styles).toEqual({ textAlign: "center" });
		});
	});

	describe("indentation", () => {
		it("should compute paddingInlineStart for indent 1", () => {
			const node = { ...mockNodeWithIndent, indent: 1 };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toEqual({ paddingInlineStart: "40px" });
		});

		it("should compute paddingInlineStart for indent 2", () => {
			const node = { ...mockNodeWithIndent, indent: 2 };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toEqual({ paddingInlineStart: "80px" });
		});

		it("should compute paddingInlineStart for indent 5", () => {
			const node = { ...mockNodeWithIndent, indent: 5 };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toEqual({ paddingInlineStart: "200px" });
		});

		it("should skip indent for listitem nodes", () => {
			const styles = computeNodeStyles(mockListItemNode, defaultConfig);

			expect(styles).toBeUndefined();
		});

		it("should return undefined for indent 0", () => {
			const node = { ...mockNodeWithIndent, indent: 0 };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toBeUndefined();
		});
	});

	describe("disableIndent config", () => {
		it("should skip indent when globally disabled", () => {
			const node = { ...mockNodeWithIndent, indent: 2 };

			const styles = computeNodeStyles(node, configWithDisabledIndent);

			expect(styles).toBeUndefined();
		});

		it("should skip indent for specific node types", () => {
			const node = { ...mockNodeWithIndent, type: "quote", indent: 2 };

			const styles = computeNodeStyles(node, configWithSelectiveIndent);

			expect(styles).toBeUndefined();
		});

		it("should apply indent for non-disabled node types", () => {
			const node = { ...mockNodeWithIndent, type: "paragraph", indent: 2 };

			const styles = computeNodeStyles(node, configWithSelectiveIndent);

			expect(styles).toEqual({ paddingInlineStart: "80px" });
		});
	});

	describe("combined styles", () => {
		it("should compute both textAlign and indent", () => {
			const node = {
				type: "paragraph",
				version: 1,
				format: "center",
				indent: 2,
				children: [],
			} as SerializedLexicalNode & { format?: string; indent?: number };

			const styles = computeNodeStyles(node, defaultConfig);

			expect(styles).toEqual({
				textAlign: "center",
				paddingInlineStart: "80px",
			});
		});
	});
});
