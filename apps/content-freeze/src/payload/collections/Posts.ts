import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
	slug: "posts",
	versions: {
		drafts: true,
	},
	fields: [
		{
			name: "text",
			type: "text",
			required: true,
			localized: true,
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
};
