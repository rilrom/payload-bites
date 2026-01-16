import { expect, type Page } from "@playwright/test";

import { getBanner } from "./getBanner";

/**
 * Asserts that the content freeze banner is not visible.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Uses {@link getBanner} to locate the banner element.
 * Verifies the banner has zero count (not in DOM).
 */
export const verifyBannerHidden = async (page: Page) => {
	const banner = getBanner(page);

	await expect(banner).toHaveCount(0);
};
