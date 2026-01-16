import { expect, type Page } from "@playwright/test";

import { navigateToGlobal } from "./navigateToGlobal";

/**
 * Navigates to a global where update access is blocked and asserts
 * that no update actions are available.
 *
 * @param page - The Playwright page instance
 * @param slug - The global slug to check
 *
 * @remarks
 * Navigates to the global edit view and verifies that the siteTitle
 * field is disabled and no save button is present due to access
 * control restrictions.
 * Intended for negative permission tests.
 */
export const verifyGlobalUpdateBlocked = async (page: Page, slug: string) => {
	await navigateToGlobal(page, slug);

	const textField = page.locator("#field-siteTitle");

	await expect(textField).toBeDisabled();

	const saveButton = page.locator("#action-save");

	await expect(saveButton).toHaveCount(0);
};
