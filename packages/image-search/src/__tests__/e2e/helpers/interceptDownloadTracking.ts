import type { Page } from "@playwright/test";

/**
 * Waits for the response to the Unsplash download tracking call.
 *
 * @param page - The Playwright page instance
 * @returns A promise that resolves with the `/api/providers/unsplash/track-download` response
 *
 * @example
 * ```ts
 * const tracking = interceptDownloadTracking(page);
 * await clickImageCard(drawer, 0);
 * expect((await tracking).status()).toBe(200);
 * ```
 *
 * @remarks
 * Unsplash requires download tracking to be triggered when an image is selected.
 * Call this before the action that triggers tracking so the response is not missed.
 */
export const interceptDownloadTracking = (page: Page) =>
	page.waitForResponse((response) =>
		response.url().includes("/api/providers/unsplash/track-download"),
	);
