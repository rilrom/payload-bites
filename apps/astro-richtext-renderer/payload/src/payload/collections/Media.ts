import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	fields: [],
	upload: {
		imageSizes: [
			{
				name: "rectangle",
				width: 1200,
				height: 600,
				crop: "center",
			},
			{
				name: "square",
				width: 400,
				height: 400,
				crop: "center",
			},
		],
	},
};
