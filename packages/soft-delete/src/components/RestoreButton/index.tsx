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
import type { ClientCollectionConfig, Field } from "payload";

import { useSoftDelete } from "../SoftDeleteProvider/index.client.js";
import type {
  TranslationsKeys,
  TranslationsObject,
} from "../../translations.js";

interface RestoreButtonProps {
  field: Field;
}

export const RestoreButton = (props: RestoreButtonProps) => {
  const { field } = props;

  const { id, collectionSlug, title } = useDocumentInfo();

  const { config, getEntityConfig } = useConfig();
  const { i18n, t } = useTranslation<TranslationsObject, TranslationsKeys>();
  const router = useRouter();
  const { showSoftDeleted } = useSoftDelete();

  const deletedAt = useFormFields(([fields]) => fields.deletedAt);

  const enabled = field.admin?.custom?.enabled;

  const collectionConfig = getEntityConfig({
    collectionSlug,
  }) as ClientCollectionConfig;

  const addDefaultError = useCallback(() => {
    toast.error(t("softDelete:restoringTitle", { title }));
  }, [t, title]);

  const handleRestore = async () => {
    try {
      if (!enabled) {
        return;
      }

      const response = await fetch(`${config.routes.api}/restore`, {
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
    const editScreen = document.querySelector(
      ".collection-edit.collection-edit--is-editing",
    );

    if (!enabled || !showSoftDeleted || !editScreen) {
      return;
    }

    const docControlsControlsWrapper = editScreen.querySelector(
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
      const popupButtonList =
        docControlsPopup.querySelector(".popup-button-list");

      const restoreButtonList = document.getElementById("restore-button-list");

      if (popupButtonList && restoreButtonList) {
        popupButtonList.append(restoreButtonList);

        restoreButtonList.style.display = "inherit";
      }
    }
  }, [enabled, showSoftDeleted]);

  if (!enabled) {
    return;
  }

  return (
    <>
      <button
        type="button"
        id="restore-button-list"
        className="popup-button-list__button"
        style={{ display: "none" }}
        onClick={handleRestore}
      >
        {t("softDelete:restore")}
      </button>
      <div
        id="restore-button-pill"
        style={{
          display: "none",
        }}
      >
        <Pill onClick={handleRestore}>{t("softDelete:restore")}</Pill>
      </div>
    </>
  );
};
