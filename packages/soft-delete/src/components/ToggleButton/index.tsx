"use client";

import { useEffect } from "react";
import { useSelection, useTranslation } from "@payloadcms/ui";

import { useSoftDelete } from "../SoftDeleteProvider/index.client.js";
import { TranslationsKeys, TranslationsObject } from "../../translations.js";

export const ToggleButton = () => {
  const { showSoftDeleted, toggleSoftDelete } = useSoftDelete();
  const selection = useSelection();
  const { t } = useTranslation<TranslationsObject, TranslationsKeys>();

  const handleToggle = () => {
    if (selection.count >= 1) {
      selection.toggleAll(false);
    }

    if (showSoftDeleted) {
      toggleSoftDelete(false);
    } else {
      toggleSoftDelete(true);
    }
  };

  // Moves the toggle button near the heading
  useEffect(() => {
    const listHeader = document.querySelector(".list-header");
    const collectionListSubheader = document.querySelector(
      ".collection-list__sub-header",
    );

    const toggleButton = document.getElementById("toggle-button");

    if (listHeader && collectionListSubheader && toggleButton) {
      listHeader.insertBefore(toggleButton, collectionListSubheader);

      toggleButton.style.display = "inherit";
    }
  }, []);

  // Provides a visual indicator that you are viewing soft deleted documents
  useEffect(() => {
    const title = document.querySelector(".list-header h1");

    if (!title) {
      return;
    }

    const existingSpan = title.querySelector("span");
    existingSpan?.remove();

    if (showSoftDeleted) {
      const span = document.createElement("span");
      span.textContent = ` - ${t("softDelete:deleted")}`;
      title.appendChild(span);
    }
  }, [showSoftDeleted, t]);

  return (
    <button
      type="button"
      id="toggle-button"
      className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
      style={{ display: "none" }}
      onClick={handleToggle}
    >
      {t("softDelete:toggleDeleted")}
    </button>
  );
};
