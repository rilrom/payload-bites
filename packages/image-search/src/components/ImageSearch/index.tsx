"use client";

import {
  Button,
  Drawer,
  useConfig,
  useModal,
  useUploadControls,
} from "@payloadcms/ui";
import { SearchImages } from "../SearchImages/index.js";
import { useCallback } from "react";

export const searchImagesDrawerSlug = "search-images";

export const ImageSearch = () => {
  const { setUploadControlFileUrl } = useUploadControls();

  const { config } = useConfig();

  const { openModal, closeModal } = useModal();

  const handleSearchSubmit = useCallback(
    (url: string) => {
      if (!url) {
        return;
      }

      setUploadControlFileUrl(url);

      closeModal(searchImagesDrawerSlug);
    },
    [setUploadControlFileUrl, closeModal],
  );

  return (
    <>
      |
      <Button
        buttonStyle="pill"
        size="small"
        onClick={() => openModal(searchImagesDrawerSlug)}
      >
        Search images
      </Button>
      <Drawer slug={searchImagesDrawerSlug}>
        <SearchImages
          serverURL={config.serverURL}
          api={config.routes.api}
          onSelect={handleSearchSubmit}
        />
      </Drawer>
    </>
  );
};
