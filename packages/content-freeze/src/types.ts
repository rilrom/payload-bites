import type { GlobalConfig } from "payload";

export type ContentFreezePluginOptions = {
	/**
	 * Enables or disables the plugin.
	 *
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * This function takes the default content freeze settings global configured in the plugin and allows you to override it by modifying and returning it.
	 *
	 * @example
	 * overrideContentFreezeSettingsGlobal: (global) => ({
	 *   ...global,
	 *   access: {
	 *     ...global.access,
	 *     read: ({ req }) => req.user?.role === 'admin',
	 *     update: ({ req }) => req.user?.role === 'admin',
	 *   },
	 *   admin: {
	 *     ...global.admin,
	 *     group: 'Settings',
	 *   },
	 * }),
	 */
	overrideContentFreezeSettingsGlobal?: (global: GlobalConfig) => GlobalConfig;
};
