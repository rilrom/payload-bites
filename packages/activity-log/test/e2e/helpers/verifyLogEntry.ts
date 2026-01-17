import { expect, type Page } from "@playwright/test";

import { getLatestLogEntry } from "./getLatestLogEntry";
import { navigateToActivityLog } from "./navigateToActivityLog";

/**
 * Expected values for verifying a log entry.
 */
export interface ExpectedLogEntry {
	operation: string;
	resource: string;
	documentId?: string;
}

/**
 * Verifies the most recent activity log entry matches expected values.
 *
 * @param page - The Playwright page instance
 * @param expected - The expected operation, resource, and optional document ID
 *
 * @remarks
 * Uses {@link navigateToActivityLog} to go to the activity log, then
 * {@link getLatestLogEntry} to read the first entry.
 * Asserts operation (case-insensitive) and resource match.
 * Optionally checks document ID if provided.
 */
export const verifyLogEntry = async (
	page: Page,
	expected: ExpectedLogEntry,
) => {
	await navigateToActivityLog(page);

	const entry = await getLatestLogEntry(page);

	expect(entry.operation.toLowerCase()).toBe(expected.operation);

	expect(entry.resource).toBe(expected.resource);

	if (expected.documentId) {
		expect(entry.documentId).toBe(expected.documentId);
	}
};
