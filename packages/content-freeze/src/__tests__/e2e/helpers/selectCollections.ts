import { expect, type Page } from "@playwright/test";

/**
 * Selects collections to freeze using the multi-select field.
 *
 * @param page - The Playwright page instance
 * @param slugs - Array of collection slugs to select
 *
 * @remarks
 * Assumes the page is already on the content freeze settings global.
 * Opens the select dropdown and clicks each option by slug.
 * Saves after selection and waits for success toast.
 */
export const selectCollections = async (page: Page, slugs: string[]) => {
	const selectControl = page.locator("#field-collections .rs__control");

	await selectControl.click();

	for (const slug of slugs) {
		const option = page.locator(`.rs__menu .rs__option:has-text("${slug}")`);

		await option.click();

		if (slugs.indexOf(slug) < slugs.length - 1) {
			await selectControl.click();
		}
	}

	const saveButton = page.locator("#action-save");

	await saveButton.click();

	const toast = page.locator(".payload-toast-container .toast-success");

	await expect(toast).toBeVisible();
};
