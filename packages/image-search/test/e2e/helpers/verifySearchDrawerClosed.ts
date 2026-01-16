import { expect, type Page } from "@playwright/test";

/**
 * Verifies that the search drawer has been closed.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Asserts that the search-images dialog element is no longer in the DOM.
 */
export const verifySearchDrawerClosed = async (page: Page) => {
	const drawer = page.locator('dialog[id="search-images"]');

	await expect(drawer).toHaveCount(0);
};
