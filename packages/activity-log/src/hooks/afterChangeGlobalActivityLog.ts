import type { GlobalAfterChangeHook } from "payload";

import type { ActivityLogPluginSharedLoggingOptions } from "../types.js";

interface Options extends ActivityLogPluginSharedLoggingOptions {
	enableDraftAutosaveLogging: boolean;
}

export const afterChangeGlobalActivityLog = (
	options: Options,
): GlobalAfterChangeHook => {
	return async (args) => {
		if (args.req.payloadAPI === "local") {
			return args.doc;
		}

		if (
			args.req.query.draft &&
			args.req.query.autosave &&
			!options.enableDraftAutosaveLogging
		) {
			return args.doc;
		}

		try {
			await args.req.payload.create({
				collection: options.activityLogSlug,
				data: {
					operation: "update",
					user: {
						value: args.req.user?.id,
						relationTo: args.req.user?.collection,
					},
					ipAddress: options.enableIpAddressLogging
						? args.req.headers.get("x-forwarded-for")
						: undefined,
					deviceInfo: options.enableDeviceInfoLogging
						? args.req.headers.get("user-agent")
						: undefined,
					locale: args.req.locale,
					resource: args.global.slug,
					documentId: args.doc.id,
					data: args.doc,
				},
				req: args.req,
			});
		} catch (error) {
			args.req.payload.logger.error(error);
		}

		return args.doc;
	};
};
