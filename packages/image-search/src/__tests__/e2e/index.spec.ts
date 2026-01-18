import { expect, test } from "@playwright/test";
import { clearSearchInput } from "./helpers/clearSearchInput.js";
import { clickImageCard } from "./helpers/clickImageCard.js";
import { clickNextPage } from "./helpers/clickNextPage.js";
import { clickPreviewCancel } from "./helpers/clickPreviewCancel.js";
import { clickPreviewSelect } from "./helpers/clickPreviewSelect.js";
import { getFirstImageSrc } from "./helpers/getFirstImageSrc.js";
import { getImageCards } from "./helpers/getImageCards.js";
import { getPagination } from "./helpers/getPagination.js";
import { interceptDownloadTracking } from "./helpers/interceptDownloadTracking.js";
import { navigateToMediaCreate } from "./helpers/navigateToMediaCreate.js";
import { openPreviewDrawer } from "./helpers/openPreviewDrawer.js";
import { openSearchDrawer } from "./helpers/openSearchDrawer.js";
import { searchForTerm } from "./helpers/searchForTerm.js";
import { selectProvider } from "./helpers/selectProvider.js";
import { verifyDropdownOpen } from "./helpers/verifyDropdownOpen.js";
import { verifyNoResults } from "./helpers/verifyNoResults.js";
import { verifyPreviewDrawerClosed } from "./helpers/verifyPreviewDrawerClosed.js";
import { verifySearchDrawerClosed } from "./helpers/verifySearchDrawerClosed.js";
import { verifyUploadFieldUrl } from "./helpers/verifyUploadFieldUrl.js";
import { waitForImages } from "./helpers/waitForImages.js";
import type { Provider } from "./types.js";

const PROVIDERS: Provider[] = ["Unsplash", "Pexels", "Pixabay"];

test("should open search drawer", async ({ page }) => {
	await navigateToMediaCreate(page);

	await openSearchDrawer(page);
});

test("should show providers in dropdown", async ({ page }) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await verifyDropdownOpen(drawer);

	const selectOptions = drawer.locator(".search-images .rs__menu");

	await expect(selectOptions.locator(".rs__option")).toHaveText(PROVIDERS);
});

test("should load featured images", async ({ page }) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	const imageCards = getImageCards(drawer);

	await expect(imageCards.first()).toBeVisible();
});

test("should display image results after searching", async ({ page }) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	await searchForTerm(drawer, "mountains");

	await waitForImages(drawer);

	const imageCards = getImageCards(drawer);

	await expect(imageCards.first()).toBeVisible();

	const attribution = drawer.locator(".search-images__attribution").first();

	await expect(attribution).toBeVisible();
});

test("should select image directly from results", async ({ page }) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	await clickImageCard(drawer, 0);

	await verifySearchDrawerClosed(page);

	await verifyUploadFieldUrl(page);
});

test("should preview the full-sized image", async ({ page }) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	const previewDrawer = await openPreviewDrawer(page, drawer, 0);

	const previewImage = previewDrawer.locator(".preview-image__image img");

	await expect(previewImage).toBeVisible();
});

test("should select image from the preview drawer", async ({ page }) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	const previewDrawer = await openPreviewDrawer(page, drawer, 0);

	await clickPreviewSelect(previewDrawer);

	await verifyPreviewDrawerClosed(page);

	await verifyUploadFieldUrl(page);
});

test("should paginate through search results", async ({ page }) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	await searchForTerm(drawer, "nature");

	await waitForImages(drawer);

	const pagination = getPagination(drawer);

	await expect(pagination).toBeVisible();

	const firstImageBefore = await getFirstImageSrc(drawer);

	await clickNextPage(drawer);

	const firstImageAfter = await getFirstImageSrc(drawer);

	expect(firstImageAfter).not.toBe(firstImageBefore);
});

test("should show no results message on empty search results", async ({
	page,
}) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	await searchForTerm(drawer, "ghffghfgdfghrtd6rthsdfsdsdfsdfgsdfg");

	await verifyNoResults(drawer);
});

test("should re-show featured images after emptying search input", async ({
	page,
}) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	await searchForTerm(drawer, "dogs");

	await waitForImages(drawer);

	await clearSearchInput(drawer);

	await waitForImages(drawer);

	const pagination = getPagination(drawer);

	await expect(pagination).toHaveCount(0);

	const imageCards = getImageCards(drawer);

	await expect(imageCards.first()).toBeVisible();
});

test("should cancel preview image without selecting", async ({ page }) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	const previewDrawer = await openPreviewDrawer(page, drawer, 0);

	await clickPreviewCancel(previewDrawer);

	await verifyPreviewDrawerClosed(page);
});

test("should trigger unsplash download tracking on selection", async ({
	page,
}) => {
	await navigateToMediaCreate(page);

	const drawer = await openSearchDrawer(page);

	await waitForImages(drawer);

	const tracking = interceptDownloadTracking(page);

	await clickImageCard(drawer, 0);

	await verifySearchDrawerClosed(page);

	expect(tracking.wasCalled()).toBe(true);
});

for (const provider of PROVIDERS) {
	test(`should return valid ${provider} search results`, async ({ page }) => {
		await navigateToMediaCreate(page);

		const drawer = await openSearchDrawer(page);

		await waitForImages(drawer);

		if (provider !== "Unsplash") {
			await selectProvider(drawer, provider);

			await waitForImages(drawer);
		}

		const imageCards = getImageCards(drawer);

		await expect(imageCards.first()).toBeVisible();

		await searchForTerm(drawer, "sunset");

		await waitForImages(drawer);

		await expect(imageCards.first()).toBeVisible();
	});
}

for (const provider of PROVIDERS) {
	test(`should display ${provider} attribution text correctly`, async ({
		page,
	}) => {
		await navigateToMediaCreate(page);

		const drawer = await openSearchDrawer(page);

		await waitForImages(drawer);

		if (provider !== "Unsplash") {
			await selectProvider(drawer, provider);

			await waitForImages(drawer);
		}

		const providerText = drawer.locator(".search-images__provider");

		await expect(providerText).toContainText(provider);
	});
}
