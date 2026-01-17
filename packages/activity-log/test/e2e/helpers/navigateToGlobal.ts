import type { Page } from "@playwright/test";

/**
 * Navigates to a global's edit view.
 *
 * @param page - The Playwright page instance
 * @param slug - The global slug to navigate to
 *
 * @remarks
 * Uses the admin panel's globals route.
 */
export const navigateToGlobal = async (page: Page, slug: string) => {
	await page.goto(`/admin/globals/${slug}`);
};
