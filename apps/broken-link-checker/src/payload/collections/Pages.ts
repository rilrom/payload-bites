import type { CollectionConfig } from "payload";
import { Content } from "../blocks/Content";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "layout",
      label: "Content",
      type: "blocks",
      blocks: [Content],
      required: true,
    },
  ],
};
