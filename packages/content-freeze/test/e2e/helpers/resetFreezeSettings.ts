import { expect, type Page } from "@playwright/test";

import { navigateToSettings } from "./navigateToSettings";

/**
 * Resets freeze settings to disabled state with no collections/globals selected.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Used in beforeEach to ensure a clean state for each test.
 * Navigates to settings, unchecks enable checkbox, clears all selections,
 * clears the message, and saves. Waits for success toast.
 */
export const resetFreezeSettings = async (page: Page) => {
	await navigateToSettings(page);

	let changed = false;

	const checkbox = page.locator("#field-enableContentFreeze");

	if (await checkbox.isChecked()) {
		await checkbox.click();

		changed = true;
	}

	const collectionsClearButton = page
		.locator("#field-collections")
		.locator(".rs__indicators .clear-indicator");

	if ((await collectionsClearButton.count()) > 0) {
		await collectionsClearButton.click();

		changed = true;
	}

	const globalsClearButton = page
		.locator("#field-globals")
		.locator(".rs__indicators .clear-indicator");

	if ((await globalsClearButton.count()) > 0) {
		await globalsClearButton.click();

		changed = true;
	}

	const messageField = page.locator("#field-message");

	const currentMessage = await messageField.inputValue();

	if (currentMessage !== "") {
		await messageField.fill("");

		changed = true;
	}

	if (!changed) {
		return;
	}

	const saveButton = page.locator("#action-save");

	await expect(saveButton).toBeEnabled();

	await saveButton.click();

	const toast = page.locator(".payload-toast-container .toast-success");

	await expect(toast).toBeVisible();
};
