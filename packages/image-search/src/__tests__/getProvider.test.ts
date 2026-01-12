import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Pexels } from "../classes/Pexels.js";
import { Pixabay } from "../classes/Pixabay.js";
import { Unsplash } from "../classes/Unsplash.js";
import { getProvider } from "../utils/getProvider.js";

describe("getProvider", () => {
	const originalEnv = process.env;

	beforeEach(() => {
		vi.resetModules();
		process.env = { ...originalEnv };
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it("returns Unsplash provider for 'unsplash'", () => {
		const provider = getProvider("unsplash");

		expect(provider).toBeInstanceOf(Unsplash);
	});

	it("returns Pexels provider for 'pexels'", () => {
		const provider = getProvider("pexels");

		expect(provider).toBeInstanceOf(Pexels);
	});

	it("returns Pixabay provider for 'pixabay'", () => {
		const provider = getProvider("pixabay");

		expect(provider).toBeInstanceOf(Pixabay);
	});

	it("returns null for unknown provider name", () => {
		const provider = getProvider("unknown");

		expect(provider).toBeNull();
	});

	it("returns null when no provider name given", () => {
		const provider = getProvider();

		expect(provider).toBeNull();
	});

	it("returns null for undefined provider name", () => {
		const provider = getProvider(undefined);

		expect(provider).toBeNull();
	});
});
