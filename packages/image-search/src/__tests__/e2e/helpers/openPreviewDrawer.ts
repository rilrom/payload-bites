import { expect, type Locator, type Page } from "@playwright/test";

/**
 * Clicks the zoom/preview icon on an image card to open the preview drawer.
 *
 * @param page - The Playwright page instance (needed to locate the preview drawer)
 * @param element - A Locator scoped to the search drawer or container
 * @param index - Zero-based index of the card to preview (defaults to 0)
 * @returns The preview drawer dialog Locator for further interactions
 *
 * @remarks
 * Waits for the preview drawer to be visible before returning.
 */
export const openPreviewDrawer = async (
	page: Page,
	element: Locator,
	index = 0,
) => {
	const imageCards = element.locator(".search-images__card");

	const card = imageCards.nth(index);

	const zoomButton = card.locator(
		".search-images__topOverlay .search-images__button",
	);

	await zoomButton.click();

	const previewDrawer = page.locator('dialog[id="preview-image"]');

	await expect(previewDrawer).toBeVisible();

	return previewDrawer;
};
