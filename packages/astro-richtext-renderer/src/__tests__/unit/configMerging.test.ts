import { describe, expect, it } from "vitest";
import type {
	AstroConverter,
	AstroConverters,
	RichTextConfig,
} from "../../types";
import { mergeConfig, resolveConverters } from "../../utils/configMerging";
import {
	createMockConverter,
	mockConverters,
} from "../fixtures/mockConverters";

describe("mergeConfig", () => {
	it("should return defaults when config is undefined", () => {
		const result = mergeConfig(undefined);

		expect(result).toEqual({
			disableContainer: false,
			disableIndent: false,
			disableTextAlign: false,
		});
	});

	describe("partial config", () => {
		it("should merge partial config with defaults", () => {
			const result = mergeConfig({ disableContainer: true });

			expect(result).toEqual({
				disableContainer: true,
				disableIndent: false,
				disableTextAlign: false,
			});
		});

		it("should preserve multiple custom properties", () => {
			const result = mergeConfig({
				disableContainer: true,
				disableTextAlign: ["paragraph"],
			});

			expect(result).toEqual({
				disableContainer: true,
				disableIndent: false,
				disableTextAlign: ["paragraph"],
			});
		});
	});

	describe("custom config properties", () => {
		it("should preserve custom properties", () => {
			const result = mergeConfig({
				disableContainer: false,
				customProperty: "value",
				anotherCustom: 123,
			} as RichTextConfig);

			expect(result).toEqual({
				disableContainer: false,
				disableIndent: false,
				disableTextAlign: false,
				customProperty: "value",
				anotherCustom: 123,
			});
		});
	});
});

describe("resolveConverters", () => {
	it("should return defaults when converters is undefined", () => {
		const result = resolveConverters(undefined, mockConverters);

		expect(result).toBe(mockConverters);
	});

	describe("converter function", () => {
		it("should call function with defaultConverters", () => {
			const customConverter: AstroConverter = createMockConverter();

			const converterFn = ({
				defaultConverters,
			}: {
				defaultConverters: AstroConverters;
			}) =>
				({
					...defaultConverters,
					paragraph: customConverter,
				}) as AstroConverters;

			const result = resolveConverters(converterFn, mockConverters);

			expect(result.paragraph).toBe(customConverter);

			expect(result.heading).toBe(mockConverters.heading);
		});

		it("should support adding custom blocks", () => {
			const customBlockConverter: AstroConverter = createMockConverter();

			const converterFn = ({
				defaultConverters,
			}: {
				defaultConverters: AstroConverters;
			}) =>
				({
					...defaultConverters,
					blocks: {
						...defaultConverters.blocks,
						customBlock: customBlockConverter,
					},
				}) as AstroConverters;

			const result = resolveConverters(converterFn, mockConverters);

			expect(result.blocks?.customBlock).toBe(customBlockConverter);

			expect(result.blocks?.imageBlock).toBe(mockConverters.blocks?.imageBlock);
		});

		it("should support overriding specific converters", () => {
			const customHeadingConverter: AstroConverter = createMockConverter();

			const converterFn = () =>
				({
					paragraph: mockConverters.paragraph,
					heading: customHeadingConverter,
				}) as AstroConverters;

			const result = resolveConverters(converterFn, mockConverters);

			expect(result.heading).toBe(customHeadingConverter);

			expect(result.paragraph).toBe(mockConverters.paragraph);
		});
	});

	describe("converter object", () => {
		it("should return object as-is", () => {
			const customConverters: AstroConverters = {
				paragraph: createMockConverter(),
				heading: createMockConverter(),
			};

			const result = resolveConverters(customConverters, mockConverters);

			expect(result).toBe(customConverters);
		});

		it("should support custom blocks in object", () => {
			const customBlockConverter: AstroConverter = createMockConverter();

			const customConverters: AstroConverters = {
				paragraph: mockConverters.paragraph,
				blocks: {
					customBlock: customBlockConverter,
				},
			};

			const result = resolveConverters(customConverters, mockConverters);

			expect(result.blocks?.customBlock).toBe(customBlockConverter);
		});
	});
});
