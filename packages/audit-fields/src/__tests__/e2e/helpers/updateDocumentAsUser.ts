import { type APIRequestContext, expect } from "@playwright/test";

import type { TestUser } from "./createUser.js";

export const updateDocumentAsUser = async (
	request: APIRequestContext,
	user: TestUser,
	path: string,
	data: Record<string, unknown>,
) => {
	const login = await request.post("/api/users/login", { data: user });

	expect(login.ok()).toBe(true);

	const { token } = (await login.json()) as { token: string };

	const response = await request.patch(path, {
		data,
		headers: { Authorization: `JWT ${token}` },
	});

	expect(response.ok()).toBe(true);
};
