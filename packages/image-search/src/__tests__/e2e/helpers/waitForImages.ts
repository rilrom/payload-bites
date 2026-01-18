import { expect, type Locator } from "@playwright/test";

/**
 * Waits for the image search results to finish loading.
 *
 * @param element - A Locator scoped to the search drawer or container
 *
 * @remarks
 * Waits for two conditions:
 * 1. The loading indicator is no longer present
 * 2. The results grid is visible
 */
export const waitForImages = async (element: Locator) => {
	const loadingIndicator = element.locator(".search-images__loading");

	await expect(loadingIndicator).toHaveCount(0);

	const resultsGrid = element.locator(".search-images__results");

	await expect(resultsGrid).toBeVisible();
};
