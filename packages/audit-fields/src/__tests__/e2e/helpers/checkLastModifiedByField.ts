import { expect, type Page } from "@playwright/test";

export const checkLastModifiedByField = async (
	page: Page,
	email = process.env.TEST_USER,
) => {
	const lastModifiedByField = page.locator(
		"#field-lastModifiedBy .relationship--single-value__text",
	);

	if (email) {
		await expect(lastModifiedByField).toHaveText(email);
	} else {
		throw new Error("Unable to find test user");
	}
};
