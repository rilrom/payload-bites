import type { BrokenLinkCheckerPluginOptions } from "./types.js";

export const defaultPluginOptions: BrokenLinkCheckerPluginOptions = {
  enabled: true,
  scanLinksAccess: ({ req: { user } }) => Boolean(user),
  collections: {},
};
