import type { Page } from "@playwright/test";

import { navigateToGlobal } from "./navigateToGlobal.js";

/**
 * Updates a global with a timestamped value.
 *
 * @param page - The Playwright page instance
 * @param slug - The global slug to update
 *
 * @remarks
 * Uses {@link navigateToGlobal} to navigate to the global,
 * updates the text field, saves, and waits for success toast.
 */
export const updateGlobal = async (page: Page, slug: string) => {
	await navigateToGlobal(page, slug);

	const textField = page.locator("#field-text");

	await textField.fill(`Updated global ${Date.now()}`);

	const saveButton = page.locator("#action-save");

	await saveButton.click();

	await page.waitForSelector(".payload-toast-container .toast-success");
};
