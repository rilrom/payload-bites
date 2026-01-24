import {
	goToFirstCell,
	navigateToCollection,
} from "@payload-bites/playwright-utilities";
import type { Page } from "@playwright/test";

/**
 * Updates the first document in a collection with a timestamped value.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug containing the document
 * @returns The ID of the updated document
 *
 * @remarks
 * Uses {@link navigateToCollection} and {@link goToFirstCell} to navigate
 * to the first document, updates the text field, saves, and waits for
 * success toast. Extracts document ID from URL.
 */
export const updateDocument = async (
	page: Page,
	collection: string,
): Promise<string> => {
	await navigateToCollection(page, collection);

	await goToFirstCell(page);

	const url = page.url();
	const match = url.match(/\/collections\/[^/]+\/(\d+)/);
	const documentId = match?.[1] ?? "";

	const textField = page.locator("#field-text");

	await textField.fill(`Updated document ${Date.now()}`);

	const saveButton = page.locator("#action-save");

	await saveButton.click();

	await page.waitForSelector(".payload-toast-container .toast-success");

	return documentId;
};
