import { LinkChecker } from "linkinator";
import { TaskConfig } from "payload";

import { BrokenLinkCheckerResolvedUrl } from "../types.js";

export const tasks: TaskConfig[] = [
  {
    slug: "scanLinks",
    outputSchema: [
      {
        name: "startedAt",
        type: "date",
      },
      {
        name: "completedAt",
        type: "date",
      },
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
    handler: async ({ req }) => {
      const startedAt = new Date();

      const urls = (await req.payload?.config?.custom?.brokenLinkChecker?.resolvedUrls?.({
        req,
      })) as BrokenLinkCheckerResolvedUrl[];

      const linkinatorOptions = req.payload?.config?.custom?.brokenLinkChecker?.linkinatorOptions || {};

      const checker = new LinkChecker();

      const results = await checker.check({
        ...linkinatorOptions,
        path: urls.map((r) => r.url),
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

      const data = {
        startedAt,
        completedAt: new Date(),
        totalLinks: notSkippedResults.length,
        totalBrokenLinks: brokenResults.length,
        results: formattedResults,
      };

      await req.payload.create({
        collection: req.payload?.config?.custom?.brokenLinkChecker?.slug,
        data,
      });

      return {
        output: data,
      };
    },
  },
];
