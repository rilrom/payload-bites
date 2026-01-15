import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Pexels } from "../../src/classes/Pexels.js";
import { Pixabay } from "../../src/classes/Pixabay.js";
import { Unsplash } from "../../src/classes/Unsplash.js";
import { getProviders } from "../../src/utils/getProviders.js";

describe("getProviders", () => {
	const originalEnv = process.env;

	beforeEach(() => {
		vi.resetModules();

		process.env = { ...originalEnv };
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it("returns only configured providers", () => {
		process.env.API_KEY_UNSPLASH = "test-unsplash-key";
		process.env.API_KEY_PEXELS = "test-pexels-key";

		delete process.env.API_KEY_PIXABAY;

		const providers = getProviders();

		expect(providers).toHaveLength(2);
		expect(providers[0]).toBeInstanceOf(Unsplash);
		expect(providers[1]).toBeInstanceOf(Pexels);
	});

	it("returns empty array when no providers are configured", () => {
		delete process.env.API_KEY_UNSPLASH;
		delete process.env.API_KEY_PEXELS;
		delete process.env.API_KEY_PIXABAY;

		const providers = getProviders();

		expect(providers).toEqual([]);
	});

	it("returns all providers when all are configured", () => {
		process.env.API_KEY_UNSPLASH = "test-unsplash-key";
		process.env.API_KEY_PEXELS = "test-pexels-key";
		process.env.API_KEY_PIXABAY = "test-pixabay-key";

		const providers = getProviders();

		expect(providers).toHaveLength(3);
		expect(providers[0]).toBeInstanceOf(Unsplash);
		expect(providers[1]).toBeInstanceOf(Pexels);
		expect(providers[2]).toBeInstanceOf(Pixabay);
	});
});
