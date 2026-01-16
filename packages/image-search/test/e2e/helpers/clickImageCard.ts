import type { Locator } from "@playwright/test";

/**
 * Clicks the selection button on an image card to select it.
 *
 * @param element - A Locator scoped to the search drawer or container
 * @param index - Zero-based index of the card to click (defaults to 0)
 *
 * @remarks
 * This triggers image selection and will close the search drawer.
 * For Unsplash images, this also triggers download tracking.
 */
export const clickImageCard = async (element: Locator, index = 0) => {
	const imageCards = element.locator(".search-images__card");

	const card = imageCards.nth(index);

	const imageButton = card.locator("> .search-images__button");

	await imageButton.click();
};
