import type { Access, PayloadRequest } from "payload";

type FreezeSettings = Awaited<
	ReturnType<PayloadRequest["payload"]["findGlobal"]>
>;

export const getFreezeSettingsCacheKey = (settingsSlug: string) =>
	`contentFreeze:${settingsSlug}`;

/**
 * Payload evaluates every access operation for every collection and global on
 * each admin render, so the settings read is shared for the whole request.
 */
const getFreezeSettings = (
	req: PayloadRequest,
	settingsSlug: string,
): Promise<FreezeSettings> => {
	const key = getFreezeSettingsCacheKey(settingsSlug);
	const cached = req.context[key] as Promise<FreezeSettings> | undefined;

	if (cached) {
		return cached;
	}

	// findGlobal replaces req.context synchronously (createPayloadRequest), so `??=` would cache onto the discarded object.
	const settings = req.payload
		.findGlobal({
			slug: settingsSlug,
			overrideAccess: true,
			req,
		})
		.catch((error: unknown) => {
			delete req.context[key];
			throw error;
		});

	req.context[key] = settings;

	return settings;
};

export const wrapAccessControl = (
	originalAccess: Access | undefined,
	settingsSlug: string,
	entitySlug: string,
	entityType: "collection" | "global",
): Access => {
	return async (args) => {
		const freezeSettings = await getFreezeSettings(args.req, settingsSlug);

		if (freezeSettings?.enableContentFreeze) {
			if (entityType === "collection") {
				if (freezeSettings?.collections?.includes(entitySlug)) {
					return false;
				}
			}

			if (entityType === "global") {
				if (freezeSettings?.globals?.includes(entitySlug)) {
					return false;
				}
			}
		}

		if (originalAccess) {
			if (typeof originalAccess === "function") {
				return await originalAccess(args);
			}

			return originalAccess;
		}

		return Boolean(args.req.user);
	};
};
