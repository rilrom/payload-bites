import { expect, type Page } from "@playwright/test";

export const verifySuccessMessage = async (page: Page) => {
	await expect(page.locator(".payload-toast-container")).toContainText(
		"successfully",
	);
	await expect.poll(() => page.url()).not.toContain("create");
};
