import type { CheckOptions } from "linkinator";

import type { BrokenLinkCheckerPluginOptions } from "./types.js";

export const defaultLinkinatorOptions: Omit<CheckOptions, "path"> = {
	recurse: true,
	linksToSkip: ["/_next/", "mailto:", "tel:"],
};

export const defaultPluginOptions: BrokenLinkCheckerPluginOptions = {
	enabled: true,
	scanLinksAccess: ({ req: { user } }) => Boolean(user),
	collections: {},
};
