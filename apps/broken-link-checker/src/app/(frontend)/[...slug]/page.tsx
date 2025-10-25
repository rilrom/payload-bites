import { notFound } from "next/navigation";
import React from "react";

import { RenderBlocks } from "@/app/_components/RenderBlocks";
import { getPayload } from "@/app/_utils/getPayload";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function Page(props: PageProps) {
  const { params } = props;

  const { slug: pathSegments } = await params;

  const isHome = typeof pathSegments === "undefined" || !pathSegments.length;
  const pageUrl = isHome ? "/" : `/${pathSegments.join("/")}`;
  const pageSlug = isHome ? "home" : pathSegments[pathSegments.length - 1];

  const payload = await getPayload();

  const {
    docs: [page],
  } = await payload.find({
    collection: "pages",
    depth: 0,
    limit: 1,
    where: isHome
      ? {
          slug: {
            equals: "home",
          },
        }
      : {
          and: [
            {
              "breadcrumbs.url": {
                equals: pageUrl,
              },
            },
            {
              slug: {
                equals: pageSlug,
              },
            },
          ],
        },
  });

  if (!page) {
    return notFound();
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <RenderBlocks blocks={page.layout} />
    </div>
  );
}
