import type { CollectionConfig, Config } from "payload";

import { defaultAuthCollection } from "../defaults.js";
import type { ActivityLogPluginOptions } from "../types.js";

export const getActivityLogCollection = ({
	config,
	pluginOptions,
}: {
	config: Config;
	pluginOptions: ActivityLogPluginOptions;
}): CollectionConfig => {
	let collection: CollectionConfig = {
		slug: "activity-log",
		admin: {
			defaultColumns: [
				"timestamp",
				"user",
				"operation",
				"resource",
				"documentId",
			],
			disableCopyToLocale: true,
			enableRichTextLink: false,
			enableRichTextRelationship: false,
			...(pluginOptions.admin?.group && {
				group: pluginOptions.admin.group,
			}),
		},
		access: {
			create: () => false,
			read: (args) =>
				pluginOptions.access?.read?.(args) ?? Boolean(args.req.user),
			update: (args) => pluginOptions.access?.update?.(args) ?? false,
			delete: (args) => pluginOptions.access?.delete?.(args) ?? false,
		},
		disableDuplicate: true,
		timestamps: false,
		fields: [
			{
				name: "user",
				type: "relationship",
				relationTo: [config.admin?.user || defaultAuthCollection],
				admin: {
					allowCreate: false,
					allowEdit: false,
				},
			},
			{
				name: "operation",
				type: "select",
				options: [
					{
						value: "create",
						label: "Create",
					},
					{
						value: "read",
						label: "Read",
					},
					{
						value: "update",
						label: "Update",
					},
					{
						value: "delete",
						label: "Delete",
					},
				],
			},
			{
				name: "timestamp",
				type: "date",
				admin: {
					date: {
						pickerAppearance: "dayAndTime",
					},
				},
				defaultValue: () => new Date(),
			},
			{
				name: "ipAddress",
				type: "text",
			},
			{
				name: "deviceInfo",
				type: "text",
			},
			{
				name: "locale",
				type: "text",
			},
			{
				name: "resource",
				type: "text",
			},
			{
				name: "documentId",
				type: "text",
			},
			{
				name: "data",
				type: "json",
			},
		],
	};

	if (
		pluginOptions?.overrideActivityLogCollection &&
		typeof pluginOptions.overrideActivityLogCollection === "function"
	) {
		collection = pluginOptions.overrideActivityLogCollection(collection);
	}

	return collection;
};
