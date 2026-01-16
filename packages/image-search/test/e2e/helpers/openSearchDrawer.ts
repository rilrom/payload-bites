import { expect, type Page } from "@playwright/test";

/**
 * Opens the image search drawer by clicking the "Search images" button.
 *
 * @param page - The Playwright page instance
 * @returns The search drawer dialog Locator for further interactions
 *
 * @remarks
 * Waits for the drawer to be visible before returning.
 */
export const openSearchDrawer = async (page: Page) => {
	const searchButton = page.getByRole("button", { name: "Search images" });

	await searchButton.click();

	const drawer = page.locator('dialog[id="search-images"]');

	await expect(drawer).toBeVisible();

	return drawer;
};
