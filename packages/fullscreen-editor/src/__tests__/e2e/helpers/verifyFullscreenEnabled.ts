import { expect, type Page } from "@playwright/test";

import { getRichTextField } from "./getRichTextField.js";

export const verifyFullscreenEnabled = async (page: Page) => {
	const field = getRichTextField(page);

	await expect(page.locator("body")).toHaveClass(/\bfocus-mode\b/);
	await expect(field).toHaveClass(/\bfocused-editor\b/);
	await expect(field).toHaveCSS("position", "fixed");
	await expect(
		field.locator('[data-button-key="toggleFullscreen"]'),
	).toHaveAttribute("aria-pressed", "true");
	await expect(
		field.locator(".rich-text-lexical__label-row > .field-label"),
	).toBeHidden();

	const viewport = page.viewportSize();
	const box = await field.boundingBox();

	expect(viewport).not.toBeNull();
	expect(box).toEqual({
		x: 0,
		y: 0,
		width: viewport?.width,
		height: viewport?.height,
	});
};
