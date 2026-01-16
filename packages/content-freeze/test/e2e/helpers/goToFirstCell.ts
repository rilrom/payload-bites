import type { Page } from "@playwright/test";

/**
 * Clicks the first document link in a collection list table.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Assumes the page is already on a collection list view.
 * Extracts the href from the first table cell link and navigates to it.
 */
export const goToFirstCell = async (page: Page) => {
	const cellLink = page.locator(`tbody tr:first-child td a`).first();

	const linkUrl = await cellLink.getAttribute("href");

	if (linkUrl) {
		await page.goto(linkUrl);
	}
};
