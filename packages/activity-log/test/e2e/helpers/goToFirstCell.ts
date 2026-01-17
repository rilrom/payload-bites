import type { Page } from "@playwright/test";

/**
 * Navigates to the first document in a collection list.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Assumes the page is already on a collection list view.
 * Finds the first link in the table body and navigates to it.
 */
export const goToFirstCell = async (page: Page) => {
	const cellLink = page.locator(`tbody tr:first-child td a`).first();

	const linkUrl = await cellLink.getAttribute("href");

	if (linkUrl) {
		await page.goto(linkUrl);
	}
};
