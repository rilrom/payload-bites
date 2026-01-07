import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Astro.
 *
 * @type {import("eslint").Linter.Config} */
export const config = [
  ...baseConfig,
  {
    ignores: [".astro/**", "dist/**"],
  },
];
