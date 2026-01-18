import type { Page } from "@playwright/test";

/**
 * Represents a single activity log entry.
 */
export interface LogEntry {
	timestamp: string;
	user: string;
	operation: string;
	resource: string;
	documentId: string;
}

/**
 * Extracts the most recent activity log entry from the table.
 *
 * @param page - The Playwright page instance
 * @returns The parsed log entry data from the first table row
 *
 * @remarks
 * Assumes the page is already on the activity log collection view.
 * Reads cell values from the first row of the table body.
 */
export const getLatestLogEntry = async (page: Page): Promise<LogEntry> => {
	const firstRow = page.locator("tbody tr:first-child");

	const cells = firstRow.locator("td");

	const timestamp = await cells.nth(1).innerText();
	const user = await cells.nth(2).innerText();
	const operation = await cells.nth(3).innerText();
	const resource = await cells.nth(4).innerText();
	const documentId = await cells.nth(5).innerText();

	return { timestamp, user, operation, resource, documentId };
};
