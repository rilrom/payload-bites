import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InvalidProviderRequestError } from "../../classes/Provider.js";
import { Unsplash } from "../../classes/Unsplash.js";

describe("Unsplash.trackDownload", () => {
	const fetchMock = vi.fn();

	beforeEach(() => {
		vi.stubEnv("API_KEY_UNSPLASH", "test-key");
		fetchMock.mockResolvedValue(new Response("{}"));
		vi.stubGlobal("fetch", fetchMock);
	});

	afterEach(() => {
		fetchMock.mockReset();
		vi.unstubAllGlobals();
		vi.unstubAllEnvs();
	});

	it("sends a genuine download URL to the Unsplash API", async () => {
		const provider = new Unsplash();

		await provider.trackDownload(
			"https://api.unsplash.com/photos/abc_123-XYZ/download?ixid=foo&utm_source=bar",
		);

		expect(fetchMock).toHaveBeenCalledTimes(1);

		const [requestUrl, init] = fetchMock.mock.calls[0] ?? [];

		expect(String(requestUrl)).toBe(
			"https://api.unsplash.com/photos/abc_123-XYZ/download?ixid=foo&utm_source=bar",
		);
		expect(init.headers).toEqual({ Authorization: "Client-ID test-key" });
	});

	it.each([
		["protocol-relative path", "https://x//evil.com/steal"],
		["backslash path", "https://x/\\evil.com/steal"],
		["another host", "https://evil.com/photos/abc/download"],
		["lookalike host", "https://api.unsplash.com.evil.com/photos/abc/download"],
		[
			"credentials in authority",
			"https://api.unsplash.com@evil.com/photos/abc/download",
		],
		["plain http", "http://api.unsplash.com/photos/abc/download"],
		["non-default port", "https://api.unsplash.com:8443/photos/abc/download"],
		["another API path", "https://api.unsplash.com/me"],
		[
			"dot segments",
			"https://api.unsplash.com/photos/abc/download/../../../me",
		],
		["encoded slash in id", "https://api.unsplash.com/photos/a%2Fb/download"],
		["empty string", ""],
		["not a URL", "not a url"],
	])("rejects %s without sending a request", async (_label, url) => {
		const provider = new Unsplash();

		await expect(provider.trackDownload(url)).rejects.toBeInstanceOf(
			InvalidProviderRequestError,
		);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});

describe("Provider.fetch", () => {
	const fetchMock = vi.fn();

	beforeEach(() => {
		vi.stubEnv("API_KEY_UNSPLASH", "test-key");
		fetchMock.mockResolvedValue(new Response("{}"));
		vi.stubGlobal("fetch", fetchMock);
	});

	afterEach(() => {
		fetchMock.mockReset();
		vi.unstubAllGlobals();
		vi.unstubAllEnvs();
	});

	it.each([
		"//evil.com/steal",
		"/\\evil.com/steal",
		"https://evil.com/steal",
	])("refuses to send credentials for path %s", async (path) => {
		const provider = new Unsplash();

		await expect(provider.fetch("GET", path)).rejects.toBeInstanceOf(
			InvalidProviderRequestError,
		);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});
