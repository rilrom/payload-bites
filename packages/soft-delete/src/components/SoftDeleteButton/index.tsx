"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import {
  Pill,
  toast,
  useConfig,
  useDocumentInfo,
  useFormFields,
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

export const SoftDeleteButton = () => {
  const { id, collectionSlug, title } = useDocumentInfo();

  const { config, getEntityConfig } = useConfig();
  const { i18n, t } = useTranslation<TranslationsObject, TranslationsKeys>();
  const router = useRouter();
  const { showSoftDeleted } = useSoftDelete();

  const deletedAt = useFormFields(([fields]) => fields.deletedAt);

  const collectionConfig = getEntityConfig({
    collectionSlug,
  }) as ClientCollectionConfig;

  const addDefaultError = useCallback(() => {
    toast.error(t("softDelete:deletingTitle", { title }));
  }, [t, title]);

  const handleSoftDelete = async () => {
    try {
      const response = await fetch(`${config.routes.api}/soft-delete`, {
        method: "POST",
        body: JSON.stringify({
          collection: collectionSlug,
          id,
          deletedAt: deletedAt?.value,
        }),
      });

      const json = await response.json();

      if (response.status < 400) {
        toast.success(
          t("softDelete:titleDeleted", {
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

  // Places the soft delete button in the popup list if available.
  // If it's not available (e.g. create access control is set to false), it will be placed where the popup list usually is as a pill.
  useEffect(() => {
    const editScreen = document.querySelector(
      ".collection-edit.collection-edit--is-editing",
    );

    // If we're viewing a soft deleted document or we're on the create screen, we don't want the soft delete button to show
    if (showSoftDeleted || !editScreen) {
      return;
    }

    const docControlsControlsWrapper = editScreen.querySelector(
      ".doc-controls__controls-wrapper",
    );

    const docControlsPopup = docControlsControlsWrapper?.querySelector(
      ".doc-controls__popup",
    );

    if (!docControlsPopup) {
      const softDeleteButtonPill = document.getElementById(
        "soft-delete-button-pill",
      );

      if (softDeleteButtonPill) {
        docControlsControlsWrapper?.prepend(softDeleteButtonPill);

        softDeleteButtonPill.style.display = "inherit";
      }
    } else {
      const popupButtonList =
        docControlsPopup.querySelector(".popup-button-list");

      const softDeleteButtonList = document.getElementById(
        "soft-delete-button-list",
      );

      if (popupButtonList && softDeleteButtonList) {
        popupButtonList.append(softDeleteButtonList);

        softDeleteButtonList.style.display = "inherit";
      }
    }
  }, [showSoftDeleted]);

  return (
    <>
      <button
        type="button"
        id="soft-delete-button-list"
        className="popup-button-list__button"
        style={{ display: "none" }}
        onClick={handleSoftDelete}
      >
        {t("softDelete:softDelete")}
      </button>
      <div
        id="soft-delete-button-pill"
        style={{
          display: "none",
        }}
      >
        <Pill onClick={handleSoftDelete}>{t("softDelete:softDelete")}</Pill>
      </div>
    </>
  );
};
