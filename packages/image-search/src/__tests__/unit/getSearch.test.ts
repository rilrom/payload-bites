import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Pexels } from "../../classes/Pexels.js";
import { Pixabay } from "../../classes/Pixabay.js";

describe("getSearch totalPages", () => {
	const fetchMock = vi.fn();

	beforeEach(() => {
		vi.stubGlobal("fetch", fetchMock);
	});

	afterEach(() => {
		fetchMock.mockReset();
		vi.unstubAllGlobals();
	});

	it.each([
		[85, 4],
		[25, 1],
		[475, 19],
		[100_000, 19],
	])("Pexels returns %i results as %i pages", async (total, pages) => {
		fetchMock.mockResolvedValue(
			Response.json({ photos: [], total_results: total }),
		);

		const result = await new Pexels().getSearch("cat", 1);

		expect(result.totalPages).toBe(pages);
	});

	it.each([
		[40, 2],
		[500, 20],
		[0, 0],
	])("Pixabay returns %i hits as %i pages", async (total, pages) => {
		fetchMock.mockResolvedValue(Response.json({ hits: [], totalHits: total }));

		const result = await new Pixabay().getSearch("cat", 1);

		expect(result.totalPages).toBe(pages);
	});
});
