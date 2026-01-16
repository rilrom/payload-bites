import { expect, type Page } from "@playwright/test";

/**
 * Opens the document controls popup menu if present.
 *
 * @param page - The Playwright page instance
 * @returns The popup content Locator if the menu exists, undefined otherwise
 *
 * @remarks
 * Clicks the doc controls button to reveal the popup menu.
 * Returns the content locator for further assertions on menu items.
 */
export const openDocControls = async (page: Page) => {
	const docControlsButton = page.locator(".doc-controls__popup .popup-button");

	if ((await docControlsButton.count()) > 0) {
		await docControlsButton.click();

		const docControlsContent = page.locator(
			".doc-controls__popup .popup__content",
		);

		await expect(docControlsContent).toBeVisible();

		return docControlsContent;
	}
};
