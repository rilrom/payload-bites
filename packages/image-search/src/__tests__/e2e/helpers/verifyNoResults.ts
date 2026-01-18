import { expect, type Locator } from "@playwright/test";
import { getImageCards } from "./getImageCards.js";

/**
 * Verifies that the "no results" state is displayed.
 *
 * @param element - A Locator scoped to the search drawer or container
 *
 * @remarks
 * Asserts three conditions:
 * 1. Loading indicator is not present
 * 2. "No results" message is visible
 * 3. No image cards are displayed
 */
export const verifyNoResults = async (element: Locator) => {
	const loadingIndicator = element.locator(".search-images__loading");

	await expect(loadingIndicator).toHaveCount(0);

	const noResults = element.locator(".search-images__noResults");

	await expect(noResults).toBeVisible();

	const imageCards = getImageCards(element);

	await expect(imageCards).toHaveCount(0);
};
