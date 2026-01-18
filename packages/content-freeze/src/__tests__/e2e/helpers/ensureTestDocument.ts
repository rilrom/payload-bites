import type { Page } from "@playwright/test";

import { navigateToCollection } from "./navigateToCollection.js";

/**
 * Ensures at least one document exists in the collection.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug to check/seed
 *
 * @remarks
 * Navigates to the collection and checks if any documents exist.
 * If empty, creates a seed document and waits for the URL to change
 * to the edit view (indicating successful creation).
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
