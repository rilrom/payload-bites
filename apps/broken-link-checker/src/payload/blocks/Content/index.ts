import type { Block } from "payload";

export const Content: Block = {
	slug: "content",
	interfaceName: "ContentBlock",
	fields: [
		{
			name: "richText",
			type: "richText",
		},
	],
};
