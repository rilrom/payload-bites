import type { GlobalBeforeChangeHook } from "payload";

export const beforeChangeGlobalAuditField =
	(
		createdByFieldName: string,
		lastModifiedByFieldName: string,
		userSlug: string,
	): GlobalBeforeChangeHook =>
	async (args) => {
		if (!args.req.user) {
			return args.data;
		}

		if (!args.originalDoc?.id && !args.originalDoc[createdByFieldName]) {
			args.data[createdByFieldName] = {
				relationTo: userSlug,
				value: args.req.user.id,
			};
		} else {
			args.data[lastModifiedByFieldName] = {
				relationTo: userSlug,
				value: args.req.user.id,
			};
		}

		return args.data;
	};
