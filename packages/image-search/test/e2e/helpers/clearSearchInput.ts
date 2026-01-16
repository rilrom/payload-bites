import type { Locator } from "@playwright/test";

/**
 * Clears the search input field.
 *
 * @param element - A Locator scoped to the search drawer or container
 *
 * @remarks
 * Clearing the search input returns to showing featured images.
 * Call {@link waitForImages} after this to wait for featured images to load.
 */
export const clearSearchInput = async (element: Locator) => {
	const searchInput = element.locator(".search-filter__input");

	await searchInput.clear();
};
