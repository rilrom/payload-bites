import type { Locator } from "@playwright/test";
import type { Provider } from "../types";

/**
 * Selects an image provider from the dropdown.
 *
 * @param element - A Locator scoped to the search drawer or container
 * @param providerName - The provider to select ("Unsplash", "Pexels", or "Pixabay")
 *
 * @remarks
 * Opens the dropdown and clicks the matching option.
 * Call {@link waitForImages} after this to wait for the provider's images to load.
 */
export const selectProvider = async (
	element: Locator,
	providerName: Provider,
) => {
	const selectControl = element.locator(".search-images .rs__control");

	await selectControl.click();

	const option = element.locator(".rs__option", { hasText: providerName });

	await option.click();
};
