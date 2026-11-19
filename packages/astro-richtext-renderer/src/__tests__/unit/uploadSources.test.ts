import { describe, expect, it } from "vitest";
import { getResponsiveImageSources } from "../../utils/uploadSources";
import { mockUploadDocWithVariants } from "../fixtures/mockNodes";

const expectedSources = [
	{
		media: "(max-width: 400px)",
		srcSet: "/media/hero-400x300.jpg",
		type: "image/jpeg",
	},
	{
		media: "(max-width: 1024px)",
		srcSet: "/media/hero-1024x768.webp",
		type: "image/webp",
	},
];

describe("getResponsiveImageSources", () => {
	it("should build sources from variants", () => {
		expect(getResponsiveImageSources(mockUploadDocWithVariants)).toEqual(
			expectedSources,
		);
	});

	it("should skip variants missing required metadata", () => {
		const sources = getResponsiveImageSources({
			variants: {
				incomplete: {
					...mockUploadDocWithVariants.variants.thumbnail,
					url: null,
				},
				empty: null,
				tablet: mockUploadDocWithVariants.variants.tablet,
			},
		});

		expect(sources).toEqual([expectedSources[1]]);
	});

	it("should return an empty array when there are no variants", () => {
		expect(getResponsiveImageSources({ variants: {} })).toEqual([]);
		expect(getResponsiveImageSources({})).toEqual([]);
		expect(getResponsiveImageSources(null)).toEqual([]);
		expect(getResponsiveImageSources(undefined)).toEqual([]);
	});
});
