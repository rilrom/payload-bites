import { type CollectionConfig } from "payload";
import { BROKEN_LINKS_COLLECTION_SLUG } from "../constants.js";

export const brokenLinks: CollectionConfig = {
  slug: BROKEN_LINKS_COLLECTION_SLUG,
  admin: {
    components: {
      beforeListTable: [
        "@payload-bites/broken-link-checker/client#ScanLinksButton",
      ],
    },
    disableCopyToLocale: true,
    enableRichTextLink: false,
    enableRichTextRelationship: false,
  },
  access: {
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  disableDuplicate: true,
  fields: [
    {
      type: "row",
      fields: [
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
      ],
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
} as const;
