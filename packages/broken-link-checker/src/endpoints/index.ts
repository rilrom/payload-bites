import { LinkChecker } from "linkinator";
import type { Endpoint } from "payload";
import { Forbidden } from "payload";

import { BROKEN_LINKS_COLLECTION_SLUG } from "../constants.js";
import { BrokenLinkCheckerResolvedUrl } from "../types.js";

export const endpoints: Endpoint[] = [
  {
    path: "/scan-links",
    method: "post",
    handler: async (req) => {
      const data = await req.json?.();

      const access = await req.payload?.config?.custom?.brokenLinkChecker?.scanLinksAccess?.({ req, data });

      if (!access) {
        throw new Forbidden();
      }

      const urls = (await req.payload?.config?.custom?.brokenLinkChecker?.resolvedUrls?.({
        req,
      })) as BrokenLinkCheckerResolvedUrl[];

      const checker = new LinkChecker();

      const results = await checker.check({
        path: urls.map((r) => r.url),
        recurse: true,
        linksToSkip: ["/_next/", "mailto:", "tel:"],
      });

      const brokenResults = results.links.filter((r) => r.state === "BROKEN");

      const notSkippedResults = results.links.filter((r) => r.state !== "SKIPPED");

      const formattedResults = brokenResults.map((link) => {
        const urlObj = urls.find((r) => r.url === link.parent);

        return {
          sourceCollection: urlObj?.collection,
          sourceId: urlObj?.id,
          sourceUrl: link.parent,
          brokenUrl: link.url,
          statusCode: link.status,
        };
      });

      const report = {
        totalLinks: notSkippedResults.length,
        totalBrokenLinks: brokenResults.length,
        results: formattedResults,
      };

      const doc = await req.payload.create({
        collection: BROKEN_LINKS_COLLECTION_SLUG,
        data: report,
      });

      return Response.json({ success: true, doc });
    },
  },
];
