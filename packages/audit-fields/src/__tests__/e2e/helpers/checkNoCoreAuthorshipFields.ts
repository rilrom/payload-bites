import { expect, type Page } from "@playwright/test";

export const checkNoCoreAuthorshipFields = async (page: Page) => {
	await expect(page.locator("#field-updatedBy")).toHaveCount(0);
};
