import type { Block } from "payload";

export const MentionInlineBlock: Block = {
	slug: "mention",
	fields: [
		{
			name: "userId",
			type: "text",
			required: true,
		},
		{
			name: "username",
			type: "text",
			required: true,
		},
		{
			name: "displayName",
			type: "text",
			required: true,
		},
	],
};
