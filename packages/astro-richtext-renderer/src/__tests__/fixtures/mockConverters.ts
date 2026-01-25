import { vi } from "vitest";
import type { AstroConverter, AstroConverters } from "../../types";

export const createMockConverter = (): AstroConverter => {
	return vi.fn() as AstroConverter;
};

export const mockParagraphConverter: AstroConverter = createMockConverter();

export const mockHeadingConverter: AstroConverter = createMockConverter();

export const mockImageBlockConverter: AstroConverter = createMockConverter();

export const mockMentionBlockConverter: AstroConverter = createMockConverter();

export const mockConverters: AstroConverters = {
	paragraph: mockParagraphConverter,
	heading: mockHeadingConverter,
	blocks: {
		imageBlock: mockImageBlockConverter,
	},
	inlineBlocks: {
		mentionBlock: mockMentionBlockConverter,
	},
};
