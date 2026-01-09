import type { CollectionConfig } from "payload";

export const Collections: CollectionConfig = {
	slug: "collections",
	fields: [
		{
			name: "richText",
			type: "richText",
		},
		{
			name: "collections",
			type: "relationship",
			relationTo: "collections",
		},
	],
};
