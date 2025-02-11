import type { Access } from "payload";

import type { SoftDeletePluginOptions } from "./types.js";

export const defaultPluginOptions: Required<SoftDeletePluginOptions> = {
  enabled: true,
  collections: [],
  access: {},
};

export const defaultAccessControl: Access = ({ req: { user } }) =>
  Boolean(user);
