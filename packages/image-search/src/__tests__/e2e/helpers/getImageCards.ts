import type { Locator } from "@playwright/test";

/**
 * Returns a Locator for all image cards in the search results.
 *
 * @param element - A Locator scoped to the search drawer or container
 * @returns A Locator matching all `.search-images__card` elements
 *
 * @example
 * ```ts
 * const cards = getImageCards(drawer);
 * await expect(cards.first()).toBeVisible();
 * await expect(cards).toHaveCount(10);
 * ```
 */
export const getImageCards = (element: Locator) => {
	return element.locator(".search-images__card");
};
