import { expect, type Page } from "@playwright/test";

/**
 * Asserts that document creation succeeded.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Checks for a success toast to confirm the document was saved.
 * Fails the test if no success toast appears.
 */
export const verifyDocumentCreated = async (page: Page) => {
	const toast = page.locator(".payload-toast-container .toast-success");

	await expect(toast).toBeVisible();
};
