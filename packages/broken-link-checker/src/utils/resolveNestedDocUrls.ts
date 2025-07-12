import type { PayloadRequest, JsonObject, CollectionSlug } from "payload";
import { BrokenLinkCheckerResolvedUrl } from "../types.js";

type NestedDoc = {
  id: string;
  slug?: string;
  parent?: string | JsonObject;
  createdAt: string;
};

type ResolveNestedDocUrlsArgs = {
  req: PayloadRequest;
  collection: CollectionSlug;
  slugFieldName?: string;
  parentFieldName?: string;
  cursorFieldName?: string;
  baseUrl?: string;
  batchSize?: number;
};

export const resolveNestedDocUrls = async ({
  req,
  collection,
  slugFieldName = "slug",
  parentFieldName = "parent",
  cursorFieldName = "createdAt",
  baseUrl,
  batchSize = 100,
}: ResolveNestedDocUrlsArgs): Promise<BrokenLinkCheckerResolvedUrl[]> => {
  if (!baseUrl && !req.payload.config.serverURL) {
    throw new Error(
      "[broken-link-checker]: You must provide a baseUrl or ensure that serverURL is set in your payload config to use resolveNestedDocUrls.",
    );
  }

  const docMap: Record<string, NestedDoc> = {};

  const allDocs: NestedDoc[] = [];

  let cursor: string | undefined = undefined;

  let hasMore = true;

  while (hasMore) {
    const res = await req.payload.find({
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

    const docs = res.docs as NestedDoc[];

    for (const doc of docs) {
      docMap[doc.id] = doc;
    }

    allDocs.push(...docs);

    if (docs.length < batchSize) {
      hasMore = false;
    } else {
      cursor = docs[docs.length - 1]?.[
        cursorFieldName as keyof NestedDoc
      ] as string;
    }
  }

  const urls = allDocs.map((doc) => {
    const segments: string[] = [];

    let current: NestedDoc | undefined = doc;

    while (current) {
      const slug = current[slugFieldName as keyof NestedDoc];

      if (typeof slug === "string") {
        segments.unshift(slug);
      }

      const parent = current[parentFieldName as keyof NestedDoc] as
        | string
        | JsonObject
        | undefined;

      const parentId = typeof parent === "string" ? parent : parent?.id;

      current = parentId ? docMap[parentId] : undefined;
    }

    return {
      url: `${baseUrl || req.payload.config.serverURL}/${segments.join("/")}`,
      id: doc.id,
      collection,
    };
  });

  return urls;
};
