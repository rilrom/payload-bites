import type { GlobalConfig } from "payload";

export const Globals: GlobalConfig = {
	slug: "globals",
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
};
