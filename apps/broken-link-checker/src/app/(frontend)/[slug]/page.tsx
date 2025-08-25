import { notFound } from "next/navigation";
import React from "react";

import { RenderBlocks } from "@/app/_components/RenderBlocks";
import { getPayload } from "@/app/_utils/getPayload";

import { fetchPageBySlug } from "./utils";

interface PageProps {
  params: Promise<{
    slug?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const { params } = props;

  const { slug } = await params;

  const page = await fetchPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <RenderBlocks blocks={page.layout} />;
}

export async function generateStaticParams() {
  const payload = await getPayload();

  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}
