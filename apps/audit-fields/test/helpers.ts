import { expect, Page } from "@playwright/test";
import { wait } from "payload/shared";

export const navigateToAdminPage = async (page: Page, url: string) => {
  await page.goto(url);
};

export const setupFieldsVerification = async (page: Page) => {
  const createdByField = page.locator("#field-createdBy");
  const lastModifiedByField = page.locator("#field-lastModifiedBy");

  await expect(createdByField).toHaveCount(0);
  await expect(lastModifiedByField).toHaveCount(0);
};

export const performTextAction = async (page: Page, textValue: string) => {
  const textField = page.locator("#field-text");
  const saveButton = page.locator("#action-save");

  await textField.fill(textValue);

  await wait(500);

  await saveButton.click();
};

export const verifySuccessMessage = async (page: Page) => {
  await expect(page.locator(".payload-toast-container")).toContainText("successfully");
  await expect.poll(() => page.url()).not.toContain("create");
};

export const checkCreatedByField = async (page: Page) => {
  const createdByField = page.locator("#field-createdBy .relationship--single-value__text");
  await expect(createdByField).toHaveText(process.env.TEST_USER!);
};

export const checkLastModifiedByField = async (page: Page) => {
  const lastModifiedByField = page.locator("#field-lastModifiedBy .relationship--single-value__text");
  await expect(lastModifiedByField).toHaveText(process.env.TEST_USER!);
};
