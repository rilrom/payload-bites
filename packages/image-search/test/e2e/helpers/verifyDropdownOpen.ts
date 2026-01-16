import { expect, type Locator } from "@playwright/test";

/**
 * Opens the provider dropdown and verifies it is visible.
 *
 * @param element - A Locator scoped to the search drawer or container
 *
 * @remarks
 * Clicks the select control and verifies the options menu appears.
 */
export const verifyDropdownOpen = async (element: Locator) => {
	const selectControl = element.locator(".search-images .rs__control");

	await expect(selectControl).toBeVisible();

	selectControl.click();

	const selectOptions = element.locator(".search-images .rs__menu");

	await expect(selectOptions).toBeVisible();
};
