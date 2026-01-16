import type { Locator } from "@playwright/test";

/**
 * Clicks the cancel button in the preview drawer to close it without selecting.
 *
 * @param element - A Locator scoped to the preview drawer or container
 *
 * @remarks
 * This only closes the preview drawer, returning to the search results.
 * The search drawer remains open.
 */
export const clickPreviewCancel = async (element: Locator) => {
	const cancelButton = element.locator(".preview-image__cancel");

	await cancelButton.click();
};
