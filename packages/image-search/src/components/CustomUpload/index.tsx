"use client";

import { useConfig, useDocumentInfo } from "@payloadcms/ui";
import type { ClientCollectionConfig } from "payload";

import { Upload } from "../Upload/index.js";

export const CustomUpload = () => {
  const { collectionSlug: docSlug, initialState } = useDocumentInfo();

  const { getEntityConfig, config } = useConfig();

  const collectionConfig = getEntityConfig({
    collectionSlug: docSlug,
  }) as ClientCollectionConfig;

  return (
    <Upload
      collectionSlug={collectionConfig.slug}
      initialState={initialState}
      uploadConfig={collectionConfig.upload}
      serverURL={config.serverURL}
      api={config.routes.api}
    />
  );
};
