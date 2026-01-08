import type { CollectionConfig } from "payload";

import type { BrokenLinkCheckerPluginOptions } from "../types.js";

export const getBrokenLinksCollection = ({
	pluginOptions,
}: {
	pluginOptions: BrokenLinkCheckerPluginOptions;
}): CollectionConfig => {
	let collection: CollectionConfig = {
		slug: "broken-links",
		admin: {
			components: {
				beforeListTable: [
					"@payload-bites/broken-link-checker/client#ScanActions",
				],
			},
			disableCopyToLocale: true,
			enableRichTextLink: false,
			enableRichTextRelationship: false,
		},
		access: {
			create: () => false,
			update: () => false,
			delete: () => false,
		},
		disableDuplicate: true,
		fields: [
			{
				type: "row",
				fields: [
					{
						name: "totalLinks",
						type: "number",
						min: 0,
					},
					{
						name: "totalBrokenLinks",
						type: "number",
						min: 0,
					},
				],
			},
			{
				name: "results",
				type: "array",
				fields: [
					{
						type: "row",
						fields: [
							{
								name: "sourceCollection",
								type: "text",
							},
							{
								name: "sourceId",
								type: "text",
							},
							{
								name: "sourceUrl",
								type: "text",
							},
							{
								name: "brokenUrl",
								type: "text",
							},
							{
								name: "statusCode",
								type: "number",
								min: 0,
								max: 599,
							},
						],
					},
				],
			},
		],
	};

	if (
		pluginOptions?.overrideBrokenLinksCollection &&
		typeof pluginOptions.overrideBrokenLinksCollection === "function"
	) {
		collection = pluginOptions.overrideBrokenLinksCollection(collection);
	}

	return collection;
};
