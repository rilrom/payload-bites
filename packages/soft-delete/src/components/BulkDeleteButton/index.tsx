"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import { getTranslation } from "@payloadcms/translations";
import {
  ConfirmationModal,
  Pill,
  toast,
  useConfig,
  useModal,
  useRouteCache,
  useSelection,
  useTranslation,
} from "@payloadcms/ui";
import * as qs from "qs-esm";
import type { ClientCollectionConfig } from "payload";

import type {
  TranslationsKeys,
  TranslationsObject,
} from "../../translations.js";
import { useSoftDelete } from "../SoftDeleteProvider/index.client.js";

interface BulkDeleteButtonProps {
  collectionSlug: string;
  enabled: boolean;
}

export const BulkDeleteButton = (props: BulkDeleteButtonProps) => {
  const { collectionSlug, enabled } = props;

  const { config, getEntityConfig } = useConfig();
  const { i18n, t } = useTranslation<TranslationsObject, TranslationsKeys>();
  const selection = useSelection();
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const { clearRouteCache } = useRouteCache();
  const { showSoftDeleted } = useSoftDelete();
  const [deleting, setDeleting] = useState(false);
  const [allowDelete, setAllowDelete] = useState(false);

  const modalSlug = `delete-${collectionSlug}`;

  const collectionConfig = getEntityConfig({
    collectionSlug,
  }) as ClientCollectionConfig;

  const plural = collectionConfig.labels.plural;
  const singular = collectionConfig.labels.singular;

  const addDefaultError = useCallback(() => {
    setDeleting(false);
    closeModal(modalSlug);
    toast.error(t("error:unknown"));
  }, [t, closeModal, modalSlug]);

  const handleOpen = () => {
    setDeleting(false);
    openModal(modalSlug);
  };

  const handleCancel = () => {
    if (deleting) {
      return;
    }

    setDeleting(false);
    closeModal(modalSlug);
  };

  const handleDelete = async () => {
    try {
      if (!enabled || !allowDelete || deleting) {
        return;
      }

      setDeleting(true);

      const selectionArray = [...selection.selected.keys()].filter((key) =>
        selection.selected.get(key),
      );

      const response = await fetch(`${config.routes.api}/hard-delete`, {
        method: "DELETE",
        body: JSON.stringify({
          collection: collectionSlug,
          ids: selectionArray,
        }),
      });

      const json = await response.json();

      setDeleting(false);
      closeModal(modalSlug);

      const deletedDocs = json?.docs?.length || 0;
      const successLabel = deletedDocs > 1 ? plural : singular;

      if (response.status < 400 || deletedDocs > 0) {
        toast.success(
          t("general:deletedCountSuccessfully", {
            count: deletedDocs,
            label: getTranslation(successLabel, i18n),
          }),
        );

        if (json?.errors.length > 0) {
          toast.error(json.message, {
            description: json.errors
              .map((error: any) => error.message)
              .join("\n"),
          });
        }

        router.replace(
          qs.stringify(
            {
              page: selection.selectAll ? "1" : undefined,
            },
            { addQueryPrefix: true },
          ),
        );

        selection.toggleAll(false);

        clearRouteCache();

        return;
      }

      if (json.errors) {
        toast.error(json.message, {
          description: json.errors
            .map((error: any) => error.message)
            .join("\n"),
        });
      } else {
        addDefaultError();
      }
    } catch {
      return addDefaultError();
    }
  };

  // Places the bulk delete button alongside the list actions
  useEffect(() => {
    if (!enabled || !showSoftDeleted) {
      setAllowDelete(false);

      return;
    }

    const listControlsButtonsWrap = document.querySelector(
      ".list-controls .list-controls__buttons-wrap",
    );

    const bulkDeleteButton = document.getElementById("bulk-delete-button");

    if (listControlsButtonsWrap && bulkDeleteButton) {
      listControlsButtonsWrap.prepend(bulkDeleteButton);

      setAllowDelete(true);
    }
  }, [enabled, showSoftDeleted]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        id="bulk-delete-button"
        style={{
          display: showSoftDeleted && selection.count ? "inherit" : "none",
        }}
      >
        <Pill onClick={handleOpen} size="small">
          {t("general:delete")}
        </Pill>
      </div>
      <ConfirmationModal
        body={t("general:aboutToDeleteCount", {
          count: selection.count,
          label: getTranslation(selection.count > 1 ? plural : singular, i18n),
        })}
        confirmingLabel={t("general:deleting")}
        heading={t("general:confirmDeletion")}
        modalSlug={modalSlug}
        onCancel={handleCancel}
        onConfirm={handleDelete}
      />
    </>
  );
};
