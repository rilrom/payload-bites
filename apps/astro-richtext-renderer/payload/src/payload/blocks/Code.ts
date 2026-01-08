import type { Block } from "payload";

export const CodeBlock: Block = {
	slug: "code",
	fields: [
		{
			name: "language",
			type: "select",
			defaultValue: "typescript",
			options: [
				{ label: "TypeScript", value: "typescript" },
				{ label: "JavaScript", value: "javascript" },
				{ label: "HTML", value: "html" },
				{ label: "CSS", value: "css" },
				{ label: "JSON", value: "json" },
				{ label: "Bash", value: "bash" },
				{ label: "Python", value: "python" },
			],
		},
		{
			name: "code",
			type: "code",
			required: true,
		},
	],
};
