import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
	path: path.resolve(__dirname, "../../apps/audit-fields/.env"),
});

const testPort = 3003;
const testUrl = `http://localhost:${testPort}`;

export default defineConfig({
	testDir: "./test/e2e",
	use: {
		baseURL: `${testUrl}/admin`,
	},
	webServer: {
		command: `lsof -ti :${testPort} | xargs kill -9 2>/dev/null || true; pnpm dev --port ${testPort}`,
		url: testUrl,
		reuseExistingServer: false,
		cwd: path.resolve(__dirname, "../../apps/audit-fields"),
		env: {
			...process.env,
			SERVER_URL: testUrl,
		},
	},
});
