"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import {
  ConfirmationModal,
  Pill,
  toast,
  Translation,
  useConfig,
  useDocumentInfo,
  useForm,
  useFormFields,
  useModal,
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

interface DeleteButtonProps {
  field: Field;
}

export const DeleteButton = (props: DeleteButtonProps) => {
  const { field } = props;
  const { id, collectionSlug, title } = useDocumentInfo();
  const { setModified } = useForm();
  const { config, getEntityConfig } = useConfig();
  const { i18n, t } = useTranslation<TranslationsObject, TranslationsKeys>();
  const router = useRouter();
  const { showSoftDeleted } = useSoftDelete();
  const [deleting, setDeleting] = useState(false);
  const { closeModal, openModal } = useModal();
  const deletedAt = useFormFields(([fields]) => fields.deletedAt);

  const enabled = field.admin?.custom?.enabled;

  const modalSlug = `delete-${id}`;

  const collectionConfig = getEntityConfig({
    collectionSlug,
  }) as ClientCollectionConfig;

  const singular = collectionConfig.labels.singular;

  const addDefaultError = useCallback(() => {
    setDeleting(false);
    closeModal(modalSlug);
    toast.error(t("error:deletingTitle", { title }));
  }, [t, title, closeModal, modalSlug]);

  const handleOpen = () => {
    if (!enabled) {
      return;
    }

    setDeleting(false);
    openModal(modalSlug);
  };

  const handleCancel = () => {
    if (!enabled || deleting) {
      return;
    }

    setDeleting(false);
    closeModal(modalSlug);
  };

  const handleDelete = async () => {
    try {
      if (!enabled || deleting) {
        return;
      }

      setDeleting(true);
      setModified(false);

      const response = await fetch(`${config.routes.api}/hard-delete`, {
        method: "DELETE",
        body: JSON.stringify({
          collection: collectionSlug,
          id,
          deletedAt: deletedAt?.value,
        }),
      });

      const json = await response.json();

      setDeleting(false);
      closeModal(modalSlug);

      if (response.status < 400) {
        toast.success(
          t("general:titleDeleted", {
            label: getTranslation(singular, i18n),
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

      return;
    } catch {
      return addDefaultError();
    }
  };

  // Places the delete button in the popup list if available.
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
      const deleteButtonPill = document.getElementById("delete-button-pill");

      if (deleteButtonPill) {
        docControlsControlsWrapper?.append(deleteButtonPill);

        deleteButtonPill.style.display = "inherit";
      }
    } else {
      const popupButtonList =
        docControlsPopup.querySelector(".popup-button-list");

      const deleteButtonList = document.getElementById("delete-button-list");

      if (popupButtonList && deleteButtonList) {
        popupButtonList.append(deleteButtonList);

        deleteButtonList.style.display = "inherit";
      }
    }
  }, [enabled, showSoftDeleted]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        id="delete-button-list"
        className="popup-button-list__button"
        style={{ display: "none" }}
        onClick={handleOpen}
      >
        {t("general:delete")}
      </button>
      <div
        id="delete-button-pill"
        style={{
          display: "none",
        }}
      >
        <Pill onClick={handleOpen}>{t("general:delete")}</Pill>
      </div>
      <ConfirmationModal
        body={
          <Translation
            elements={{
              "1": ({ children }) => <strong>{children}</strong>,
            }}
            i18nKey="general:aboutToDelete"
            t={t as any}
            variables={{
              label: getTranslation(collectionConfig.labels.singular, i18n),
              title,
            }}
          />
        }
        confirmingLabel={t("general:deleting")}
        heading={t("general:confirmDeletion")}
        modalSlug={modalSlug}
        onCancel={handleCancel}
        onConfirm={handleDelete}
      />
    </>
  );
};
