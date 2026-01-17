import type { Page } from "@playwright/test";

import { navigateToCollection } from "./navigateToCollection";

/**
 * Navigates to collection create page, fills minimal required field, and saves.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug to create a document in
 * @returns The ID of the created document
 *
 * @remarks
 * Uses {@link navigateToCollection} to navigate to the collection list,
 * clicks create, fills the text field with a timestamped value, and saves.
 * Waits for the URL to update to extract the document ID.
 */
export const createDocument = async (
	page: Page,
	collection: string,
): Promise<string> => {
	await navigateToCollection(page, collection);

	const createButton = page.locator("a[href*='/create']").first();

	await createButton.click();

	const textField = page.locator("#field-text");

	await textField.fill(`Test document ${Date.now()}`);

	const saveButton = page.locator("#action-save");

	await saveButton.click();

	await page.waitForURL(/\/collections\/.*\/\d+/);

	const url = page.url();
	const match = url.match(/\/collections\/[^/]+\/(\d+)/);

	return match?.[1] ?? "";
};
