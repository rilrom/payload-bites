import { getPayload } from "@/app/_utils/getPayload";
import { cache } from "react";

export const fetchPageBySlug = cache(async (slug?: string) => {
  const payload = await getPayload();

  if (!slug) {
    return null;
  }

  const result = await payload.find({
    collection: "pages",
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
