import { test } from "@playwright/test";
import { checkCreatedByField } from "./helpers/checkCreatedByField.js";
import { checkLastModifiedByField } from "./helpers/checkLastModifiedByField.js";
import { navigateToAdminPage } from "./helpers/navigateToAdminPage.js";
import { performTextAction } from "./helpers/performTextAction.js";
import { setupFieldsVerification } from "./helpers/setupFieldsVerification.js";
import { verifySuccessMessage } from "./helpers/verifySuccessMessage.js";

test("collections", async ({ page }) => {
	await navigateToAdminPage(page, "/admin/collections/collections/create");
	await setupFieldsVerification(page);

	await performTextAction(page, "Text");
	await verifySuccessMessage(page);

	await checkCreatedByField(page);

	await performTextAction(page, "Text updated");
	await verifySuccessMessage(page);

	await checkLastModifiedByField(page);
});

test("globals", async ({ page }) => {
	await navigateToAdminPage(page, "/admin/globals/globals");
	await setupFieldsVerification(page);

	await performTextAction(page, "Text");
	await verifySuccessMessage(page);

	await checkCreatedByField(page);

	await performTextAction(page, "Text updated");
	await verifySuccessMessage(page);

	await checkLastModifiedByField(page);
});
