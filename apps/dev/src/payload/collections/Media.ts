import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  fields: [],
  upload: {
    crop: true,
    focalPoint: true,
    imageSizes: [
      {
        name: "thumbnail",
        height: 200,
        width: 200,
      },
      {
        name: "medium",
        height: 800,
        width: 800,
      },
      {
        name: "large",
        height: 1200,
        width: 1200,
      },
    ],
  },
};
