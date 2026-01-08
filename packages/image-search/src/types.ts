import type { Access } from "payload";

export type ImageSearchPluginOptions = {
	/**
	 * Enables or disables the plugin. Defaults to true.
	 */
	enabled?: boolean;

	/** Function that determines provider access control. Only the req attribute is available.
	 * @example
	 * providerAccess: ({ req: { user } }) => user.role === "admin"
	 */
	providerAccess?: Access;
};
