import { expect, type Page } from "@playwright/test";

import { openDocControls } from "./openDocControls.js";

/**
 * Deletes the currently viewed document via the doc controls menu.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Assumes the page is already viewing a document.
 * Uses {@link openDocControls} to access the delete button,
 * confirms the deletion dialog, and waits for success toast.
 *
 * @throws Error if doc controls are not found
 */
export const deleteDocument = async (page: Page) => {
	const docControlsContent = await openDocControls(page);

	if (!docControlsContent) {
		throw new Error("Doc controls not found");
	}

	const deleteButton = docControlsContent.getByRole("button", {
		name: "Delete",
	});

	await deleteButton.click();

	const dialog = page.locator("dialog[open]");

	await expect(dialog).toBeVisible();

	const confirmButton = dialog.getByRole("button", { name: "Confirm" });

	await confirmButton.click();

	await page.waitForSelector(".payload-toast-container .toast-success");
};
