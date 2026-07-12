import type { Page } from "@playwright/test";

import { createDocument } from "./createDocument.js";
import { navigateToCollection } from "./navigateToCollection.js";

/**
 * Ensures at least one document exists in the collection.
 *
 * @param page - The Playwright page instance
 * @param collection - The collection slug to check
 *
 * @remarks
 * Uses {@link navigateToCollection} to view the collection list.
 * If no documents exist, uses {@link createDocument} to seed a document for tests.
 * Useful for setting up test preconditions.
 */
export const ensureTestDocument = async (page: Page, collection: string) => {
	await navigateToCollection(page, collection);

	const rows = page.locator(".collection-list tbody tr");

	const count = await rows.count();

	if (count === 0) {
		await createDocument(page, collection, {
			fieldValue: "Seed document for tests",
		});
	}
};
