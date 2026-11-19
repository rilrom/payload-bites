/** @type {import('stylelint').Config} */
module.exports = {
	extends: ["stylelint-config-standard"],
	allowEmptyInput: true,
	rules: {
		"selector-class-pattern": [
			"^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*)?(--[a-z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*)?$",
			{ message: "Expected class selector to be BEM with a kebab-case block." },
		],
	},
	ignoreFiles: [
		"**/node_modules/**",
		"**/dist/**",
		"**/.next/**",
		"**/.astro/**",
		"**/.turbo/**",
	],
};
