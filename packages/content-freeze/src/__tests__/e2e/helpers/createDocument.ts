import { createDocument as sharedCreateDocument } from "@payload-bites/playwright-utilities";
import type { Page } from "@playwright/test";

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
	await sharedCreateDocument(page, collection, {
		fieldValue: "Test document",
		waitForSave: false,
	});
};
