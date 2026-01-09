import type { GlobalConfig } from "payload";

export const GlobalWithDrafts: GlobalConfig = {
	slug: "global-with-drafts",
	fields: [
		{
			name: "text",
			type: "text",
			required: true,
		},
		{
			name: "array",
			type: "array",
			fields: [
				{
					name: "key",
					type: "text",
				},
				{
					name: "value",
					type: "text",
				},
			],
		},
	],
	versions: {
		drafts: {
			autosave: {
				interval: 100,
			},
		},
	},
};
