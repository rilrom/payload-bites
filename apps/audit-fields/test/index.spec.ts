import { test } from "@playwright/test";

import {
  navigateToAdminPage,
  setupFieldsVerification,
  performTextAction,
  verifySuccessMessage,
  checkCreatedByField,
  checkLastModifiedByField,
} from "./helpers";

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
