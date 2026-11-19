/** @type {import('stylelint').Config} */
module.exports = {
	extends: ["stylelint-config-standard-scss"],
	allowEmptyInput: true,
	ignoreFiles: [
		"**/node_modules/**",
		"**/dist/**",
		"**/.next/**",
		"**/.astro/**",
		"**/.turbo/**",
	],
};
