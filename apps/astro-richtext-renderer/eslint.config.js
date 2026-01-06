import { config } from "@payload-bites/eslint-config/base";

export default [
  ...config,
  {
    ignores: [".astro/**", "dist/**"],
  },
];
