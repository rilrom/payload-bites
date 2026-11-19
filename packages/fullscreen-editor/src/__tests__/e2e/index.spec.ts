import { navigateToCollectionCreate } from "@payload-bites/playwright-utilities";
import { expect, test } from "@playwright/test";

import { clickFullscreenButton } from "./helpers/clickFullscreenButton.js";
import { getRichTextField } from "./helpers/getRichTextField.js";
import { verifyFullscreenDisabled } from "./helpers/verifyFullscreenDisabled.js";
import { verifyFullscreenEnabled } from "./helpers/verifyFullscreenEnabled.js";

test("should toggle fullscreen on and off from the toolbar", async ({
	page,
}) => {
	await navigateToCollectionCreate(page, "collections");

	await expect(getRichTextField(page)).toBeVisible();
	await verifyFullscreenDisabled(page);

	await clickFullscreenButton(page);
	await verifyFullscreenEnabled(page);

	await clickFullscreenButton(page);
	await verifyFullscreenDisabled(page);
});
