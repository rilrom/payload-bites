import { expect, type Page } from "@playwright/test";

export interface TestUser {
	email: string;
	password: string;
}

export const createUser = async (page: Page): Promise<TestUser> => {
	const user = {
		email: `second-user-${Date.now()}@payloadbites.com`,
		password: "second-user-password",
	};

	const response = await page.request.post("/api/users", { data: user });

	expect(response.ok()).toBe(true);

	return user;
};
