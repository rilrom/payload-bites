import {
	goToFirstCell,
	navigateToCollection,
	openDocControls,
} from "@payload-bites/playwright-utilities";
import { expect, type Page } from "@playwright/test";

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

	const docControlsContent = await openDocControls(page);

	if (docControlsContent) {
		const deleteButton = docControlsContent.getByRole("button", {
			name: "Delete",
		});

		await expect(deleteButton).toHaveCount(0);
	}
};
