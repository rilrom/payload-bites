import type { Page } from "@playwright/test";

/**
 * Navigates to a collection's create view.
 *
 * @param page - The Playwright page instance
 * @param slug - The collection slug to navigate to
 *
 * @remarks
 * Uses the admin panel's collections route.
 */
export const navigateToCollectionCreate = async (page: Page, slug: string) => {
	await page.goto(`/admin/collections/${slug}/create`);
};
