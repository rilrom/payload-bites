import type { ActivityLogPluginOptions } from "./types.js";

export const defaultPluginOptions: ActivityLogPluginOptions = {
	enabled: true,
	admin: {},
	access: {},
	collections: {},
	globals: {},
};

export const defaultAuthCollection = "users";

export const defaultDraftAutosaveLogging = true;

export const defaultCreateLogging = true;

export const defaultUpdateLogging = true;

export const defaultDeleteLogging = true;

export const defaultIpAddressLogging = true;

export const defaultDeviceInfoLogging = true;
