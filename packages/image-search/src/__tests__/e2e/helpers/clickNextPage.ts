import type { Locator } from "@playwright/test";
import { getPagination } from "./getPagination.js";
import { waitForImages } from "./waitForImages.js";

/**
 * Clicks the next page button in the pagination controls.
 *
 * @param element - A Locator scoped to the search drawer or container
 *
 * @remarks
 * Waits for the new images to load after clicking.
 * Assumes pagination is visible (search results have multiple pages).
 */
export const clickNextPage = async (element: Locator) => {
	const pagination = getPagination(element);

	const nextButton = pagination.locator(".clickable-arrow--right");

	await nextButton.click();

	await waitForImages(element);
};
