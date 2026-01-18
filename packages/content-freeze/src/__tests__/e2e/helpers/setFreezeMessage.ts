import { expect, type Page } from "@playwright/test";

/**
 * Sets the freeze banner message and saves.
 *
 * @param page - The Playwright page instance
 * @param message - The message to display in the freeze banner
 *
 * @remarks
 * Assumes the page is already on the content freeze settings global.
 * Fills the message textarea and saves.
 * Waits for a success toast to confirm the save completed.
 */
export const setFreezeMessage = async (page: Page, message: string) => {
	const textarea = page.locator("#field-message");

	await textarea.fill(message);

	const saveButton = page.locator("#action-save");

	await saveButton.click();

	const toast = page.locator(".payload-toast-container .toast-success");

	await expect(toast).toBeVisible();
};
