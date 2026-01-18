import { expect, type Page } from "@playwright/test";

/**
 * Verifies that the preview drawer has been closed.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Asserts that the preview-image dialog element is no longer in the DOM.
 */
export const verifyPreviewDrawerClosed = async (page: Page) => {
	const drawer = page.locator('dialog[id="preview-image"]');

	await expect(drawer).toHaveCount(0);
};
