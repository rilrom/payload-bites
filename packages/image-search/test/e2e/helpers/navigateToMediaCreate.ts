import type { Page } from "@playwright/test";

/**
 * Navigates to the media collection create page.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Assumes the app is configured with auto-login or the user is already authenticated.
 */
export const navigateToMediaCreate = async (page: Page) => {
	await page.goto("/admin/collections/media/create");
};
