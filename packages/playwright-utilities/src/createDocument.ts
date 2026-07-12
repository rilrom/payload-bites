import { expect, type Page } from "@playwright/test";

import { navigateToCollectionCreate } from "./navigateToCollectionCreate.js";
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
 * Uses {@link navigateToCollectionCreate} to navigate to the collection create view,
 * fills the specified field with a value, and saves.
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

	await navigateToCollectionCreate(page, collection);

	const textField = page.locator(`#field-${fieldName}`);

	await expect(textField).toBeVisible();

	await textField.fill(fieldValue);

	const saveButton = page.locator("#action-save");

	await expect(saveButton).toBeVisible();

	await saveButton.click();

	if (!waitForSave) {
		return "";
	}

	await page.waitForURL(/\/collections\/.*\/\d+/);

	const url = page.url();
	const match = url.match(/\/collections\/[^/]+\/(\d+)/);

	return match?.[1] ?? "";
};
