import { type ActivityLogPluginOptions } from "./types.js";

export const defaultPluginOptions: Required<ActivityLogPluginOptions> = {
  enabled: true,
  access: {},
  collections: {},
  globals: {},
};

export const defaultAuthCollection = "users";

export const defaultCreateLogging = true;

export const defaultUpdateLogging = true;

export const defaultDeleteLogging = true;

export const defaultIpAddressLogging = true;

export const defaultDeviceInfoLogging = true;
