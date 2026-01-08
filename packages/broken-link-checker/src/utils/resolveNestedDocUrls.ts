import type { CollectionSlug, PayloadRequest } from "payload";

import type { BrokenLinkCheckerResolvedUrl } from "../types.js";

type NestedDoc = {
	id: string;
	createdAt: string;
	[key: string]: unknown;
};

type ResolveNestedDocUrlsArgs = {
	req: PayloadRequest;
	collection: CollectionSlug;
	/**
	 * Should be supplied if using an alternative field name for the nested docs plugin 'breadcrumbs' field in the collection.
	 */
	breadcrumbsFieldName?: string;
	baseUrl?: string;
	batchSize?: number;
};

export const resolveNestedDocUrls = async ({
	req,
	collection,
	breadcrumbsFieldName = "breadcrumbs",
	baseUrl,
	batchSize = 100,
}: ResolveNestedDocUrlsArgs): Promise<BrokenLinkCheckerResolvedUrl[]> => {
	if (!baseUrl && !req.payload.config.serverURL) {
		throw new Error(
			"[broken-link-checker]: You must provide a baseUrl or ensure that serverURL is set in your payload config to use resolveNestedDocUrls.",
		);
	}

	const cursorFieldName = "createdAt";

	const allDocs: NestedDoc[] = [];

	let cursor: string | undefined;

	let hasMore = true;

	while (hasMore) {
		const response = await req.payload.find({
			collection,
			limit: batchSize,
			depth: 0,
			sort: cursorFieldName,
			where: cursor
				? {
						[cursorFieldName]: {
							greater_than: cursor,
						},
					}
				: {},
			overrideAccess: false,
			user: req.user,
		});

		const docs = response.docs as NestedDoc[];

		allDocs.push(...docs);

		if (docs.length < batchSize) {
			hasMore = false;
		} else {
			cursor = docs[docs.length - 1]?.[cursorFieldName];
		}
	}

	const base = (baseUrl || req.payload.config.serverURL).replace(/\/+$/, "");

	const urls = allDocs.map((doc) => {
		const breadcrumbs =
			(doc?.[breadcrumbsFieldName] as { url?: string }[]) ?? [];

		if (breadcrumbs.length === 0) {
			throw new Error(
				`[broken-link-checker]: document ${doc.id} is missing the ${breadcrumbsFieldName} field, are you sure this collection is using the nested docs plugin?`,
			);
		}

		const last = breadcrumbs[breadcrumbs.length - 1];

		let path = "";

		if (last?.url) {
			path =
				last.url === "/"
					? ""
					: last.url.startsWith("/")
						? last.url
						: `/${last.url}`;
		}

		return {
			url: `${base}${path}`,
			id: doc.id,
			collection,
		};
	});

	return urls;
};
