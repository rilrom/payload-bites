import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
	slug: "site-settings",
	fields: [
		{
			name: "siteTitle",
			type: "text",
		},
	],
};
