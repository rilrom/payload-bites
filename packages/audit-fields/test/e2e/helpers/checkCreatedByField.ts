import { expect, type Page } from "@playwright/test";

export const checkCreatedByField = async (page: Page) => {
	const createdByField = page.locator(
		"#field-createdBy .relationship--single-value__text",
	);

	if (process.env.TEST_USER) {
		await expect(createdByField).toHaveText(process.env.TEST_USER);
	} else {
		throw new Error("Unable to find test user");
	}
};
