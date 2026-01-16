import type { Page } from "@playwright/test";

/**
 * Sets up a request interceptor to detect Unsplash download tracking calls.
 *
 * @param page - The Playwright page instance
 * @returns An object with a `wasCalled` method to check if tracking was triggered
 *
 * @example
 * ```ts
 * const tracking = interceptDownloadTracking(page);
 * await clickImageCard(drawer, 0);
 * expect(tracking.wasCalled()).toBe(true);
 * ```
 *
 * @remarks
 * Unsplash requires download tracking to be triggered when an image is selected.
 * This helper listens for requests to the `/api/providers/unsplash/track-download` endpoint.
 */
export const interceptDownloadTracking = (page: Page) => {
	let trackDownloadCalled = false;

	page.on("request", (request) => {
		if (request.url().includes("/api/providers/unsplash/track-download")) {
			trackDownloadCalled = true;
		}
	});

	return {
		wasCalled: () => trackDownloadCalled,
	};
};
