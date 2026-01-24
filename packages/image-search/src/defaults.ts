import type { ImageSearchPluginOptions } from "./types.js";

export const defaultPluginOptions: Required<ImageSearchPluginOptions> = {
	enabled: true,
	providerAccess: ({ req: { user } }) => Boolean(user),
	enablePreview: true,
};
