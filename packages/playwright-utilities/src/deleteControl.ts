import { expect, type Locator, type Page } from "@playwright/test";

import { openDocControls } from "./openDocControls.js";

export const getDeleteMenuItem = (docControlsContent: Locator) =>
	docControlsContent.getByRole("menuitem", { name: "Delete", exact: true });

export const expectDeleteUnavailable = async (page: Page) => {
	await expect(page.locator(".doc-controls").first()).toBeVisible();

	const docControlsContent = await openDocControls(page);

	if (docControlsContent) {
		await expect(getDeleteMenuItem(docControlsContent)).toHaveCount(0);
	}

	await expect(page.locator("#action-delete")).toHaveCount(0);
};
