import { expect, type Page } from "@playwright/test";

export const setupFieldsVerification = async (page: Page) => {
	const createdByField = page.locator("#field-createdBy");
	const lastModifiedByField = page.locator("#field-lastModifiedBy");

	await expect(createdByField).toHaveCount(0);
	await expect(lastModifiedByField).toHaveCount(0);
};
