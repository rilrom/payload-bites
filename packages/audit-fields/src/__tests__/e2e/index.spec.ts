import { createDocument } from "@payload-bites/playwright-utilities";
import { expect, test } from "@playwright/test";
import { checkCreatedByField } from "./helpers/checkCreatedByField.js";
import { checkLastModifiedByField } from "./helpers/checkLastModifiedByField.js";
import { checkNoCoreAuthorshipFields } from "./helpers/checkNoCoreAuthorshipFields.js";
import { createUser } from "./helpers/createUser.js";
import { navigateToAdminPage } from "./helpers/navigateToAdminPage.js";
import { performTextAction } from "./helpers/performTextAction.js";
import { setupFieldsVerification } from "./helpers/setupFieldsVerification.js";
import { updateDocumentAsUser } from "./helpers/updateDocumentAsUser.js";
import { verifySuccessMessage } from "./helpers/verifySuccessMessage.js";

test("collections", async ({ page }) => {
	await navigateToAdminPage(page, "/admin/collections/collections/create");
	await setupFieldsVerification(page);

	await performTextAction(page, "Text");
	await verifySuccessMessage(page);

	await checkCreatedByField(page);
	await checkNoCoreAuthorshipFields(page);

	await performTextAction(page, "Text updated");
	await verifySuccessMessage(page);

	await checkLastModifiedByField(page);
});

test("collections keep createdBy when another user updates", async ({
	page,
	request,
}) => {
	const id = await createDocument(page, "collections", { fieldValue: "Text" });

	expect(id).not.toBe("");

	const secondUser = await createUser(page);

	await updateDocumentAsUser(request, secondUser, `/api/collections/${id}`, {
		text: "Text updated by second user",
	});

	await page.reload();

	await checkCreatedByField(page);
	await checkLastModifiedByField(page, secondUser.email);
});

test("globals", async ({ page }) => {
	await navigateToAdminPage(page, "/admin/globals/globals");
	await setupFieldsVerification(page);

	await performTextAction(page, "Text");
	await verifySuccessMessage(page);

	await checkCreatedByField(page);
	await checkNoCoreAuthorshipFields(page);

	await performTextAction(page, "Text updated");
	await verifySuccessMessage(page);

	await checkLastModifiedByField(page);
});
