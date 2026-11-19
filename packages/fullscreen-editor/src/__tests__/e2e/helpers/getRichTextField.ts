import type { Page } from "@playwright/test";

export const getRichTextField = (page: Page) =>
	page.locator(`.rich-text-lexical[data-field-path="richText"]`);
