import { test } from "@playwright/test";
import { checkCreatedByField } from "./helpers/checkCreatedByField";
import { checkLastModifiedByField } from "./helpers/checkLastModifiedByField";
import { navigateToAdminPage } from "./helpers/navigateToAdminPage";
import { performTextAction } from "./helpers/performTextAction";
import { setupFieldsVerification } from "./helpers/setupFieldsVerification";
import { verifySuccessMessage } from "./helpers/verifySuccessMessage";

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
