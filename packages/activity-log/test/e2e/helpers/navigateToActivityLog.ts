import type { Page } from "@playwright/test";

import { navigateToCollection } from "./navigateToCollection";

/**
 * Navigates to the activity log collection list view.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Uses {@link navigateToCollection} with the activity-log slug.
 */
export const navigateToActivityLog = async (page: Page) => {
	await navigateToCollection(page, "activity-log");
};
