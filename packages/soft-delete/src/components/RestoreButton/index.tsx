"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import {
  Pill,
  toast,
  useConfig,
  useDocumentInfo,
  useTranslation,
} from "@payloadcms/ui";
import { formatAdminURL } from "@payloadcms/ui/shared";
import { getTranslation } from "@payloadcms/translations";
import type { ClientCollectionConfig } from "payload";

import { useSoftDelete } from "../SoftDeleteProvider/index.client.js";
import type {
  TranslationsKeys,
  TranslationsObject,
} from "../../translations.js";

export const RestoreButton = () => {
  const { id, collectionSlug, title } = useDocumentInfo();

  const { config, getEntityConfig } = useConfig();
  const { i18n, t } = useTranslation<TranslationsObject, TranslationsKeys>();
  const router = useRouter();
  const { showSoftDeleted } = useSoftDelete();

  const collectionConfig = getEntityConfig({
    collectionSlug,
  }) as ClientCollectionConfig;

  const addDefaultError = useCallback(() => {
    toast.error(t("softDelete:restoringTitle", { title }));
  }, [t, title]);

  const handleClick = async () => {
    try {
      const response = await fetch(`${config.routes.api}/restore`, {
        method: "POST",
        body: JSON.stringify({
          collection: collectionSlug,
          ids: [id],
        }),
      });

      const json = await response.json();

      if (response.status < 400) {
        toast.success(
          t("softDelete:titleRestored", {
            label: getTranslation(collectionConfig.labels.singular, i18n),
            title,
          }) || json.message,
        );

        return router.push(
          formatAdminURL({
            adminRoute: config.routes.admin,
            path: `/collections/${collectionSlug}`,
          }),
        );
      }

      if (json.errors) {
        json.errors.forEach((error: any) => toast.error(error.message));
      } else {
        addDefaultError();
      }

      return false;
    } catch {
      return addDefaultError();
    }
  };

  // Places the restore button in the popup list if available.
  // If it's not available (e.g. create access control is set to false), it will be placed where the popup list usually is as a pill.
  useEffect(() => {
    if (!showSoftDeleted) {
      return;
    }

    const docControlsControlsWrapper = document.querySelector(
      ".doc-controls__controls-wrapper",
    );

    const docControlsPopup = docControlsControlsWrapper?.querySelector(
      ".doc-controls__popup",
    );

    if (!docControlsPopup) {
      const restoreButtonPill = document.getElementById("restore-button-pill");

      if (restoreButtonPill) {
        docControlsControlsWrapper?.append(restoreButtonPill);

        restoreButtonPill.style.display = "inherit";
      }
    } else {
      const popupButtonList = document.querySelector(".popup-button-list");

      const restoreButtonList = document.getElementById("restore-button-list");

      if (popupButtonList && restoreButtonList) {
        popupButtonList.append(restoreButtonList);

        restoreButtonList.style.display = "inherit";
      }
    }
  }, [showSoftDeleted]);

  return (
    <>
      <button
        type="button"
        id="restore-button-list"
        className="popup-button-list__button"
        style={{ display: "none" }}
        onClick={handleClick}
      >
        Restore
      </button>
      <div
        id="restore-button-pill"
        style={{
          display: "none",
        }}
      >
        <Pill onClick={handleClick}>Restore</Pill>
      </div>
    </>
  );
};
