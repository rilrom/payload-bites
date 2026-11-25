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

test("should exit fullscreen when navigating away from the document", async ({
	page,
}) => {
	await page.goto("/admin/collections/collections");
	await page
		.locator('a[href="/admin/collections/collections/create"]')
		.first()
		.click();
	await page.waitForURL("**/admin/collections/collections/create");

	await expect(getRichTextField(page)).toBeVisible();

	await clickFullscreenButton(page);
	await verifyFullscreenEnabled(page);

	await page.evaluate(() =>
		(
			window as unknown as {
				next: { router: { push: (href: string) => void } };
			}
		).next.router.push("/admin/collections/collections"),
	);
	await page.waitForURL("**/admin/collections/collections");

	await expect(page.locator("body")).not.toHaveClass(/\bfocus-mode\b/);
	await expect(page.locator(".nav")).toBeVisible();
});
