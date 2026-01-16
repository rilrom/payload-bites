import type { Page } from "@playwright/test";

/**
 * Navigates to the content freeze settings global.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Uses the admin panel's globals route to access the settings.
 */
export const navigateToSettings = async (page: Page) => {
	await page.goto("/admin/globals/content-freeze-settings");
};
