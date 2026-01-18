import { expect, type Page } from "@playwright/test";

/**
 * Opens the document controls popup menu.
 *
 * @param page - The Playwright page instance
 * @returns The popup content locator, or undefined if not found
 *
 * @remarks
 * Assumes the page is already viewing a document.
 * Clicks the doc controls button and waits for the popup to be visible.
 * Returns the popup content element for further interaction.
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
