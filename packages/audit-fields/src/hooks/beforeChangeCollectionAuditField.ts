import type { CollectionBeforeChangeHook } from "payload";

export const beforeChangeCollectionAuditField =
	(
		createdByFieldName: string,
		lastModifiedByFieldName: string,
		userSlug: string,
	): CollectionBeforeChangeHook =>
	async (args) => {
		if (!args.req.user) {
			return args.data;
		}

		if (args.operation === "create") {
			args.data[createdByFieldName] = {
				relationTo: userSlug,
				value: args.req.user.id,
			};
		}

		if (args.operation === "update") {
			args.data[lastModifiedByFieldName] = {
				relationTo: userSlug,
				value: args.req.user.id,
			};
		}

		return args.data;
	};
