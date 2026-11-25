import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		globals: true,
		environment: "node",
		include: ["src/__tests__/unit/**/*.test.ts"],
	},
});
