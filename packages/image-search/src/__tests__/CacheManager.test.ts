import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CacheManager } from "../classes/CacheManager.js";

describe("CacheManager", () => {
	let cacheManager: CacheManager;
	let mockStorage: Record<string, string>;

	beforeEach(() => {
		mockStorage = {};

		const localStorageMock = {
			getItem: vi.fn((key: string) => mockStorage[key] ?? null),
			setItem: vi.fn((key: string, value: string) => {
				mockStorage[key] = value;
			}),
			removeItem: vi.fn((key: string) => {
				delete mockStorage[key];
			}),
		};

		vi.stubGlobal("localStorage", localStorageMock);

		cacheManager = new CacheManager();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	describe("set and get", () => {
		it("round-trips data correctly", () => {
			const testData = { images: [{ id: 1 }, { id: 2 }] };

			cacheManager.set("test-query", testData);

			const result = cacheManager.get("test-query");

			expect(result).toEqual(testData);
		});

		it("stores data with version-prefixed key", () => {
			cacheManager.set("my-query", { foo: "bar" });

			// Version is "2" based on the source code
			expect(mockStorage["2my-query"]).toBeDefined();
		});

		it("handles string data", () => {
			cacheManager.set("string-key", "string-value");

			expect(cacheManager.get("string-key")).toBe("string-value");
		});

		it("handles array data", () => {
			const arrayData = [1, 2, 3];

			cacheManager.set("array-key", arrayData);

			expect(cacheManager.get("array-key")).toEqual(arrayData);
		});
	});

	describe("exists", () => {
		it("returns true for cached items", () => {
			cacheManager.set("existing-key", { data: true });

			expect(cacheManager.exists("existing-key")).toBe(true);
		});

		it("returns false for missing items", () => {
			expect(cacheManager.exists("non-existing-key")).toBe(false);
		});
	});

	describe("TTL expiration", () => {
		it("returns data before TTL expires", () => {
			vi.useFakeTimers();
			const now = Date.now();
			vi.setSystemTime(now);

			cacheManager.set("ttl-key", { data: "value" }, 60000); // 60 second TTL

			// Advance 30 seconds (before expiry)
			vi.setSystemTime(now + 30000);

			expect(cacheManager.get("ttl-key")).toEqual({ data: "value" });

			vi.useRealTimers();
		});

		it("returns null after TTL expires", () => {
			vi.useFakeTimers();

			const now = Date.now();

			vi.setSystemTime(now);

			cacheManager.set("ttl-key", { data: "value" }, 60000); // 60 second TTL

			// Advance 61 seconds (after expiry)
			vi.setSystemTime(now + 61000);

			expect(cacheManager.get("ttl-key")).toBeNull();

			vi.useRealTimers();
		});

		it("removes expired item from storage", () => {
			vi.useFakeTimers();

			const now = Date.now();

			vi.setSystemTime(now);

			cacheManager.set("ttl-key", { data: "value" }, 60000);

			// Advance past expiry
			vi.setSystemTime(now + 61000);

			cacheManager.get("ttl-key");

			expect(localStorage.removeItem).toHaveBeenCalledWith("2ttl-key");

			vi.useRealTimers();
		});

		it("stores without expiry when TTL not provided", () => {
			cacheManager.set("no-ttl-key", { data: "value" });

			const stored = JSON.parse(mockStorage["2no-ttl-key"] ?? "{}");

			expect(stored.expiry).toBeNull();
		});
	});

	describe("get edge cases", () => {
		it("returns null for non-existent key", () => {
			expect(cacheManager.get("does-not-exist")).toBeNull();
		});
	});
});
