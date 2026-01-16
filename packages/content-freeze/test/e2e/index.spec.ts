import { expect, test } from "@playwright/test";

import { createDocument } from "./helpers/createDocument";
import { enableFreeze } from "./helpers/enableFreeze";
import { ensureTestDocument } from "./helpers/ensureTestDocument";
import { getBanner } from "./helpers/getBanner";
import { navigateToSettings } from "./helpers/navigateToSettings";
import { resetFreezeSettings } from "./helpers/resetFreezeSettings";
import { selectCollections } from "./helpers/selectCollections";
import { selectGlobals } from "./helpers/selectGlobals";
import { setFreezeMessage } from "./helpers/setFreezeMessage";
import { verifyBannerVisible } from "./helpers/verifyBannerVisible";
import { verifyCollectionUpdateBlocked } from "./helpers/verifyCollectionUpdateBlocked";
import { verifyCreateBlocked } from "./helpers/verifyCreateBlocked";
import { verifyDeleteBlocked } from "./helpers/verifyDeleteBlocked";
import { verifyDocumentCreated } from "./helpers/verifyDocumentCreated";
import { verifyGlobalUpdateBlocked } from "./helpers/verifyGlobalUpdateBlocked";

test.beforeEach(async ({ page }) => {
	await resetFreezeSettings(page);
});

test("should display content freeze settings global", async ({ page }) => {
	await navigateToSettings(page);

	const checkbox = page.locator("#field-enableContentFreeze");
	await expect(checkbox).toBeVisible();

	const collectionsField = page.locator("#field-collections");
	await expect(collectionsField).toBeVisible();

	const globalsField = page.locator("#field-globals");
	await expect(globalsField).toBeVisible();

	const messageField = page.locator("#field-message");
	await expect(messageField).toBeVisible();
});

test("should show banner when freeze is enabled", async ({ page }) => {
	await navigateToSettings(page);
	await enableFreeze(page);

	await page.goto("/admin");
	await verifyBannerVisible(page);
});

test("should display custom message in banner", async ({ page }) => {
	await navigateToSettings(page);
	await enableFreeze(page);

	await navigateToSettings(page);
	await setFreezeMessage(page, "Deployment in progress - do not edit");

	await page.goto("/admin");
	const banner = getBanner(page);
	await expect(banner).toContainText("Deployment in progress - do not edit");
});

test("should block creating document in frozen collection", async ({
	page,
}) => {
	await navigateToSettings(page);
	await enableFreeze(page);

	await navigateToSettings(page);
	await selectCollections(page, ["posts"]);

	await verifyCreateBlocked(page, "posts");
});

test("should block updating document in frozen collection", async ({
	page,
}) => {
	await ensureTestDocument(page, "posts");

	await navigateToSettings(page);
	await enableFreeze(page);

	await navigateToSettings(page);
	await selectCollections(page, ["posts"]);

	await verifyCollectionUpdateBlocked(page, "posts");
});

test("should block deleting document in frozen collection", async ({
	page,
}) => {
	await ensureTestDocument(page, "posts");

	await navigateToSettings(page);
	await enableFreeze(page);

	await navigateToSettings(page);
	await selectCollections(page, ["posts"]);

	await verifyDeleteBlocked(page, "posts");
});

test("should block updating frozen global", async ({ page }) => {
	await navigateToSettings(page);
	await enableFreeze(page);

	await navigateToSettings(page);
	await selectGlobals(page, ["site-settings"]);

	await verifyGlobalUpdateBlocked(page, "site-settings");
});

test("should allow modifications to non-frozen collections", async ({
	page,
}) => {
	await navigateToSettings(page);
	await enableFreeze(page);

	await navigateToSettings(page);
	await selectCollections(page, ["posts"]);

	await createDocument(page, "pages");
	await verifyDocumentCreated(page);
});
