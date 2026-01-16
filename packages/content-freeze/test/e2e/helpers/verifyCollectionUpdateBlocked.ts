import { expect, type Page } from "@playwright/test";
import { goToFirstCell } from "./goToFirstCell";
import { navigateToCollection } from "./navigateToCollection";

/**
 * Opens a document in a collection where update access is blocked and asserts
 * that no update actions are available.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug containing the document
 *
 * @remarks
 * Navigates to the collection list, opens the first document,
 * and verifies that editing controls and save actions are not present
 * due to access control restrictions.
 * Intended for negative permission tests.
 */
export const verifyCollectionUpdateBlocked = async (
	page: Page,
	collection: string,
) => {
	await navigateToCollection(page, collection);

	await goToFirstCell(page);

	const textField = page.locator("#field-text");

	await expect(textField).toBeDisabled();

	const saveButton = page.locator("#action-save");

	await expect(saveButton).toHaveCount(0);
};
