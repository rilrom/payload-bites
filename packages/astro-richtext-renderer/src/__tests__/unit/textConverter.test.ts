import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import TextAstroConverter from "../../converters/TextAstroConverter.astro";

const render = async (format: number) => {
	const container = await AstroContainer.create();

	return container.renderToString(TextAstroConverter, {
		props: { node: { type: "text", text: "word", format, version: 1 } },
	});
};

describe("TextAstroConverter", () => {
	it("keeps bold inside inline code", async () => {
		expect(await render(1 | 16)).toBe("<code><strong>word</strong></code>");
	});

	it("keeps code inside superscript", async () => {
		expect(await render(16 | 64)).toBe("<sup><code>word</code></sup>");
	});

	it("renders plain code", async () => {
		expect(await render(16)).toBe("<code>word</code>");
	});
});
