import { expect, type Page } from "@playwright/test";

import { getRichTextField } from "./getRichTextField.js";

export const verifyFullscreenDisabled = async (page: Page) => {
	const field = getRichTextField(page);

	await expect(page.locator("body")).not.toHaveClass(/\bfocus-mode\b/);
	await expect(field).not.toHaveClass(/\bfocused-editor\b/);
	await expect(field).not.toHaveCSS("position", "fixed");
	await expect(
		field.locator('[data-button-key="toggleFullscreen"]'),
	).not.toHaveAttribute("aria-pressed", "true");
	await expect(
		field.locator(".rich-text-lexical__label-row > .field-label"),
	).toBeVisible();
};
