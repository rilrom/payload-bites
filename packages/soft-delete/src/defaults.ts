import type { Access } from "payload";

import type { SoftDeletePluginOptions } from "./types.js";

export const defaultPluginOptions: SoftDeletePluginOptions = {
  enabled: true,
  collections: {},
};

export const defaultAccessControl: Access = (args) => Boolean(args.req.user);
