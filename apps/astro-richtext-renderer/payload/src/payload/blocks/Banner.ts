import type { Block } from "payload";

export const BannerBlock: Block = {
	slug: "banner",
	fields: [
		{
			name: "style",
			type: "select",
			defaultValue: "gradient",
			options: [
				{ label: "Gradient", value: "gradient" },
				{ label: "Solid", value: "solid" },
				{ label: "Outline", value: "outline" },
			],
		},
		{
			name: "heading",
			type: "text",
			required: true,
		},
		{
			name: "description",
			type: "textarea",
		},
		{
			name: "buttonText",
			type: "text",
		},
		{
			name: "buttonUrl",
			type: "text",
		},
	],
};
