import { describe, expect, it } from "vitest";
import { Pexels } from "../../src/classes/Pexels.js";
import { Pixabay } from "../../src/classes/Pixabay.js";
import { Unsplash } from "../../src/classes/Unsplash.js";
import { pexelsFixture } from "./fixtures/pexelsFixture.js";
import { pixabayFixture } from "./fixtures/pixabayFixture.js";
import { unsplashFixture } from "./fixtures/unsplashFixture.js";

describe("Provider.formatResults", () => {
	describe("Unsplash", () => {
		it("transforms API response correctly", () => {
			const provider = new Unsplash();

			const result = provider.formatResults(unsplashFixture);

			expect(result).toMatchSnapshot();
		});

		it("handles missing alt_description", () => {
			const provider = new Unsplash();

			const result = provider.formatResults(unsplashFixture);

			// Second image has an empty alt_description
			expect(result[1]?.alt).toBe("");
		});
	});

	describe("Pexels", () => {
		it("transforms API response correctly", () => {
			const provider = new Pexels();

			const result = provider.formatResults(pexelsFixture);

			expect(result).toMatchSnapshot();
		});

		it("handles empty alt text", () => {
			const provider = new Pexels();

			const result = provider.formatResults(pexelsFixture);

			// Second image has empty alt
			expect(result[1]?.alt).toBe("");
		});
	});

	describe("Pixabay", () => {
		it("transforms API response correctly", () => {
			const provider = new Pixabay();

			const result = provider.formatResults(pixabayFixture);

			expect(result).toMatchSnapshot();
		});

		it("falls back to largeImageURL when imageURL is empty", () => {
			const provider = new Pixabay();

			const result = provider.formatResults(pixabayFixture);

			// Second image has empty imageURL, should use largeImageURL
			expect(result[1]?.urls.original).toBe(
				"https://pixabay.com/get/def456_1280.jpg",
			);

			expect(result[1]?.urls.download).toBe(
				"https://pixabay.com/get/def456_1280.jpg",
			);
		});

		it("uses imageURL when available", () => {
			const provider = new Pixabay();

			const result = provider.formatResults(pixabayFixture);

			// First image has imageURL
			expect(result[0]?.urls.original).toBe(
				"https://pixabay.com/get/abc123_full.jpg",
			);
		});

		it("constructs correct attribution link", () => {
			const provider = new Pixabay();

			const result = provider.formatResults(pixabayFixture);

			expect(result[0]?.attribution.link).toBe(
				"https://pixabay.com/users/PhotoMaster-9999/",
			);
		});
	});

	describe("Empty input", () => {
		it("Unsplash handles empty array", () => {
			const provider = new Unsplash();

			expect(provider.formatResults([])).toEqual([]);
		});

		it("Pexels handles empty array", () => {
			const provider = new Pexels();

			expect(provider.formatResults([])).toEqual([]);
		});

		it("Pixabay handles empty array", () => {
			const provider = new Pixabay();

			expect(provider.formatResults([])).toEqual([]);
		});
	});
});
