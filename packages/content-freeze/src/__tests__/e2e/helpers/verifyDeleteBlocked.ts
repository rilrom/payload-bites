import {
	expectDeleteUnavailable,
	goToFirstCell,
	navigateToCollection,
} from "@payload-bites/playwright-utilities";
import type { Page } from "@playwright/test";

/**
 * Opens a document in a collection where delete access is blocked and asserts
 * that no delete actions are available.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug containing the document
 *
 * @remarks
 * Navigates to the collection list, opens the first document,
 * and verifies that delete controls are not present due to
 * access control restrictions.
 * Intended for negative permission tests.
 */
export const verifyDeleteBlocked = async (page: Page, collection: string) => {
	await navigateToCollection(page, collection);

	await goToFirstCell(page);

	await expectDeleteUnavailable(page);
};
