import type { Locator } from "@playwright/test";

/**
 * Enters a search term and submits the search.
 *
 * @param element - A Locator scoped to the search drawer or container
 * @param term - The search term to enter
 *
 * @remarks
 * Fills the search input and presses Enter to submit.
 * Call {@link waitForImages} after this to wait for results.
 */
export const searchForTerm = async (element: Locator, term: string) => {
	const searchInput = element.locator(".search-filter__input");

	await searchInput.fill(term);

	await searchInput.press("Enter");
};
