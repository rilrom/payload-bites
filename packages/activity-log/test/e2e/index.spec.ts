import { expect, test } from "@playwright/test";

import { createDocument } from "./helpers/createDocument";
import { deleteDocument } from "./helpers/deleteDocument";
import { ensureTestDocument } from "./helpers/ensureTestDocument";
import { goToFirstCell } from "./helpers/goToFirstCell";
import { navigateToActivityLog } from "./helpers/navigateToActivityLog";
import { openDocControls } from "./helpers/openDocControls";
import { updateDocument } from "./helpers/updateDocument";
import { updateGlobal } from "./helpers/updateGlobal";
import { verifyLogEntry } from "./helpers/verifyLogEntry";

test("should display activity-log collection in admin", async ({ page }) => {
	await page.goto("/admin");

	const navLink = page.locator('a[href*="/collections/activity-log"]').first();

	await expect(navLink).toBeVisible();
});

test("should log create operation when document is created", async ({
	page,
}) => {
	const documentId = await createDocument(page, "collections");

	await verifyLogEntry(page, {
		operation: "create",
		resource: "collections",
		documentId,
	});
});

test("should log update operation when document is updated", async ({
	page,
}) => {
	await ensureTestDocument(page, "collections");

	const documentId = await updateDocument(page, "collections");

	await verifyLogEntry(page, {
		operation: "update",
		resource: "collections",
		documentId,
	});
});

test("should log delete operation when document is deleted", async ({
	page,
}) => {
	const documentId = await createDocument(page, "collections");

	await deleteDocument(page);

	await verifyLogEntry(page, {
		operation: "delete",
		resource: "collections",
		documentId,
	});
});

test("should log update operation when global is updated", async ({ page }) => {
	await updateGlobal(page, "globals");

	await verifyLogEntry(page, {
		operation: "update",
		resource: "globals",
	});
});

test("should log correct user who performed the action", async ({ page }) => {
	await createDocument(page, "collections");

	await navigateToActivityLog(page);

	await goToFirstCell(page);

	const userField = page.locator("#field-user");

	if (!process.env.TEST_USER) {
		throw new Error("Test user not found");
	}

	await expect(userField).toContainText(process.env.TEST_USER);
});

test("should log operations on draft collection", async ({ page }) => {
	const documentId = await createDocument(page, "collection-with-drafts");

	await verifyLogEntry(page, {
		operation: "create",
		resource: "collection-with-drafts",
		documentId,
	});
});

test("should log operations on draft global", async ({ page }) => {
	await updateGlobal(page, "global-with-drafts");

	await verifyLogEntry(page, {
		operation: "update",
		resource: "global-with-drafts",
	});
});

test("should block creating activity log entries", async ({ page }) => {
	await navigateToActivityLog(page);

	const createLinks = page.locator("a[href*='/create']");

	await expect(createLinks).toHaveCount(0);
});

test("should block updating activity log entries", async ({ page }) => {
	await createDocument(page, "collections");

	await navigateToActivityLog(page);

	await goToFirstCell(page);

	const saveButton = page.locator("#action-save");

	await expect(saveButton).toHaveCount(0);
});

test("should block deleting activity log entries", async ({ page }) => {
	await createDocument(page, "collections");

	await navigateToActivityLog(page);

	await goToFirstCell(page);

	const docControlsContent = await openDocControls(page);

	if (docControlsContent) {
		const deleteButton = docControlsContent.getByRole("button", {
			name: "Delete",
		});

		await expect(deleteButton).toHaveCount(0);
	}
});
