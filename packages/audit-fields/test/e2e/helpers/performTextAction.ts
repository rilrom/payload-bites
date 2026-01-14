import type { Page } from "@playwright/test";
import { wait } from "payload/shared";

export const performTextAction = async (page: Page, textValue: string) => {
	const textField = page.locator("#field-text");
	const saveButton = page.locator("#action-save");

	await textField.fill(textValue);

	await wait(500);

	await saveButton.click();
};
