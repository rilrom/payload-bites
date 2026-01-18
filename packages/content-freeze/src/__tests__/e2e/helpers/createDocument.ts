import type { Page } from "@playwright/test";

import { navigateToCollection } from "./navigateToCollection.js";

/**
 * Navigates to collection create page, fills minimal required field, and saves.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug to create a document in
 *
 * @remarks
 * Navigates to the collection list, clicks create, fills the text field,
 * and clicks save. Does not wait for success - use with
 * {@link verifyDocumentCreated} or {@link verifyErrorToast} to check result.
 */
export const createDocument = async (page: Page, collection: string) => {
	await navigateToCollection(page, collection);

	const createButton = page.locator("a[href*='/create']").first();

	await createButton.click();

	const textField = page.locator("#field-text");

	await textField.fill("Test document");

	const saveButton = page.locator("#action-save");

	await saveButton.click();
};
