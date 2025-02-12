import type { SoftDeletePluginOptions } from "./types.js";

export const defaultPluginOptions: Required<SoftDeletePluginOptions> = {
  enabled: true,
  collections: [],
  access: {},
};
