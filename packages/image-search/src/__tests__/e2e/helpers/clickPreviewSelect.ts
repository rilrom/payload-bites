import type { Locator } from "@playwright/test";

/**
 * Clicks the select button in the preview drawer to choose the image.
 *
 * @param element - A Locator scoped to the preview drawer or container
 *
 * @remarks
 * This will close both the preview drawer and search drawer,
 * and populate the upload field with the image URL.
 */
export const clickPreviewSelect = async (element: Locator) => {
	const selectButton = element.locator(".preview-image__select");

	await selectButton.click();
};
