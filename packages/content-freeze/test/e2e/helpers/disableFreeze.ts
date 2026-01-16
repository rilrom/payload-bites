import { expect, type Page } from "@playwright/test";

/**
 * Disables content freeze by unchecking the checkbox and saving.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Assumes the page is already on the content freeze settings global.
 * Only clicks the checkbox if it's currently checked.
 * Waits for a success toast to confirm the save completed.
 */
export const disableFreeze = async (page: Page) => {
	const checkbox = page.locator("#field-enableContentFreeze");

	const isChecked = await checkbox.isChecked();

	if (isChecked) {
		await checkbox.click();
	}

	const saveButton = page.locator("#action-save");

	await saveButton.click();

	const toast = page.locator(".payload-toast-container .toast-success");

	await expect(toast).toBeVisible();
};
