import { expect, type Page } from "@playwright/test";

/**
 * Verifies that the upload field contains a URL after image selection.
 *
 * @param page - The Playwright page instance
 *
 * @remarks
 * Checks that the file field filename input has a non-empty value,
 * indicating an image URL was successfully set.
 */
export const verifyUploadFieldUrl = async (page: Page) => {
	const fileInput = page.locator(".file-field .file-field__filename");

	await expect(fileInput).toHaveValue(/.+/);
};
