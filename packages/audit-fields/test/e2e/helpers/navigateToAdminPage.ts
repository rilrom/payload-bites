import type { Page } from "@playwright/test";

export const navigateToAdminPage = async (page: Page, url: string) => {
	await page.goto(url);
};
