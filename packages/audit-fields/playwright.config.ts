import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
	path: path.resolve(__dirname, "../../apps/audit-fields/.env"),
});

export default defineConfig({
	testDir: "./test/e2e",
	use: {
		baseURL: `${process.env.SERVER_URL}/admin`,
	},
	webServer: {
		command: "pnpm dev",
		url: process.env.SERVER_URL,
		reuseExistingServer: false,
		cwd: path.resolve(__dirname, "../../apps/audit-fields"),
	},
});
