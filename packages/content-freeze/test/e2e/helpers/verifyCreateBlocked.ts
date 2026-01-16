import { expect, type Page } from "@playwright/test";

import { navigateToCollection } from "./navigateToCollection";

/**
 * Navigates to a collection where create access is blocked and asserts
 * that no create action is available.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug to check
 *
 * @remarks
 * Navigates to the collection list and verifies that no create button
 * or create link is present due to access control restrictions.
 * Intended for negative permission tests.
 */
export const verifyCreateBlocked = async (page: Page, collection: string) => {
	await navigateToCollection(page, collection);

	const createLinks = page.locator("a[href*='/create']");

	await expect(createLinks).toHaveCount(0);
};
