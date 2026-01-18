import type { Locator } from "@playwright/test";
import { getImageCards } from "./getImageCards.js";

/**
 * Gets the src attribute of the first image in the results.
 *
 * @param element - A Locator scoped to the search drawer or container
 * @returns The src URL of the first image, or null if not found
 *
 * @remarks
 * Useful for verifying that pagination changed the displayed images.
 */
export const getFirstImageSrc = async (element: Locator) => {
	const cards = getImageCards(element);

	return cards.first().locator("img").getAttribute("src");
};
