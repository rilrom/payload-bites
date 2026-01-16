import type { Locator, Page } from "@playwright/test";

/**
 * Returns the content freeze banner locator.
 *
 * @param page - The Playwright page instance
 * @returns The banner Locator for further interactions or assertions
 *
 * @remarks
 * The banner appears at the top of the admin panel when content freeze is enabled.
 */
export const getBanner = (page: Page): Locator => {
	return page.locator(".content-freeze-banner");
};
