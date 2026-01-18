import type { Locator } from "@playwright/test";

/**
 * Returns a Locator for the pagination controls.
 *
 * @param element - A Locator scoped to the search drawer or container
 * @returns A Locator for the `.search-images__pagination` element
 *
 * @remarks
 * Pagination is only visible when there are multiple pages of search results.
 * Featured images (no search term) do not show pagination.
 */
export const getPagination = (element: Locator) => {
	return element.locator(".search-images__pagination");
};
