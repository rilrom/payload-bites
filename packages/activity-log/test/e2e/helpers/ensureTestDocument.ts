import type { Page } from "@playwright/test";

import { navigateToCollection } from "./navigateToCollection";

/**
 * Ensures at least one document exists in the collection.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug to check
 *
 * @remarks
 * Uses {@link navigateToCollection} to view the collection list.
 * If no documents exist, creates a seed document for tests.
 * Useful for setting up test preconditions.
 */
export const ensureTestDocument = async (page: Page, collection: string) => {
	await navigateToCollection(page, collection);

	const rows = page.locator(".collection-list tbody tr");

	const count = await rows.count();

	if (count === 0) {
		const createButton = page.locator("a[href*='/create']").first();

		await createButton.click();

		const textField = page.locator("#field-text");

		await textField.fill("Seed document for tests");

		const saveButton = page.locator("#action-save");

		await saveButton.click();

		await page.waitForURL(/\/collections\/.*\/\d+/);
	}
};
