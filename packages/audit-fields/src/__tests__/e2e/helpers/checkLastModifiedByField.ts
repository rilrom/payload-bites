import { expect, type Page } from "@playwright/test";

export const checkLastModifiedByField = async (page: Page) => {
	const lastModifiedByField = page.locator(
		"#field-lastModifiedBy .relationship--single-value__text",
	);

	if (process.env.TEST_USER) {
		await expect(lastModifiedByField).toHaveText(process.env.TEST_USER);
	} else {
		throw new Error("Unable to find test user");
	}
};
