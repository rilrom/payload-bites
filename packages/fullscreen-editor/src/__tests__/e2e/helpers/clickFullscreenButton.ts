import type { Page } from "@playwright/test";

import { getRichTextField } from "./getRichTextField.js";

export const clickFullscreenButton = async (page: Page) => {
	await getRichTextField(page)
		.locator('.fixed-toolbar [data-button-key="toggleFullscreen"]')
		.click();
};
