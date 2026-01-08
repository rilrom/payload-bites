import type { CheckOptions } from "linkinator";
import type {
	Access,
	CollectionConfig,
	CollectionSlug,
	PayloadRequest,
} from "payload";

export type BrokenLinkCheckerResolvedUrl = {
	url: string;
	id?: string;
	collection?: CollectionSlug;
};

export type BrokenLinkCheckerPluginOptions = {
	/**
	 * Enables or disables the plugin.
	 *
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * This function takes the default broken links collection configured in the plugin and allows you to override it by modifying and returning it.
	 *
	 * @example
	 * overrideBrokenLinksCollection: (collection) => ({
	 *   ...collection,
	 *   access: {
	 *     ...collection?.access,
	 *     update: () => true,
	 *     create: () => true,
	 *   },
	 *   admin: {
	 *     ...collection?.admin,
	 *     group: "Reporting",
	 *   },
	 * }),
	 */
	overrideBrokenLinksCollection?: (
		collection: CollectionConfig,
	) => CollectionConfig;

	/** Function that determines scan links access control. Only the req attribute is available.
	 * @example
	 * scanLinksAccess: ({ req: { user } }) => user.role === "admin"
	 */
	scanLinksAccess?: Access;

	/**
	 * Collections that should be scanned by the broken link checker.
	 */
	collections: {
		[key in CollectionSlug]?: {
			resolvedUrls:
				| BrokenLinkCheckerResolvedUrl[]
				| ((args: {
						req: PayloadRequest;
				  }) => Promise<BrokenLinkCheckerResolvedUrl[]>);
		};
	};

	/**
	 * This function takes the default linkinator options configured in the plugin and allows you to override them by modifying and returning them.
	 *
	 * Note: 'path' cannot be overriden as it is handled by the plugin through resolvedUrls.
	 *
	 * @see https://github.com/JustinBeckwith/linkinator
	 *
	 * @example
	 * overrideLinkinatorOptions: (defaultOptions) => ({
	 *   ...defaultOptions,
	 *   concurrency: 50,
	 *   timeout: 5000,
	 *   userAgent: "Custom User Agent",
	 *   linksToSkip: [...defaultOptions.linksToSkip, "http://localhost:3000/blog/example-post"],
	 * }),
	 */
	overrideLinkinatorOptions?: (
		defaultOptions: Omit<CheckOptions, "path">,
	) => Omit<CheckOptions, "path">;
};
