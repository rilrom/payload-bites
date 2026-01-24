import type { Page } from "@playwright/test";

import { navigateToCollection } from "./navigateToCollection.js";
import type { CreateDocumentOptions } from "./types.js";

/**
 * Navigates to collection create page, fills minimal required field, and saves.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug to create a document in
 * @param options - Optional configuration for document creation
 * @returns The ID of the created document (empty string if waitForSave is false)
 *
 * @remarks
 * Uses {@link navigateToCollection} to navigate to the collection list,
 * clicks create, fills the specified field with a value, and saves.
 * If waitForSave is true, waits for the URL to update and extracts the document ID.
 */
export const createDocument = async (
	page: Page,
	collection: string,
	options?: CreateDocumentOptions,
): Promise<string> => {
	const {
		fieldName = "text",
		fieldValue = `Test document ${Date.now()}`,
		waitForSave = true,
	} = options ?? {};

	await navigateToCollection(page, collection);

	const createButton = page.locator("a[href*='/create']").first();

	await createButton.click();

	const textField = page.locator(`#field-${fieldName}`);

	await textField.fill(fieldValue);

	const saveButton = page.locator("#action-save");

	await saveButton.click();

	if (!waitForSave) {
		return "";
	}

	await page.waitForURL(/\/collections\/.*\/\d+/);

	const url = page.url();
	const match = url.match(/\/collections\/[^/]+\/(\d+)/);

	return match?.[1] ?? "";
};
