import { expect, type Page } from "@playwright/test";

import { getBanner } from "./getBanner";

/**
 * Asserts that the content freeze banner is visible.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Uses {@link getBanner} to locate the banner element.
 * Fails the test if the banner is not visible.
 */
export const verifyBannerVisible = async (page: Page) => {
	const banner = getBanner(page);

	await expect(banner).toBeVisible();
};
