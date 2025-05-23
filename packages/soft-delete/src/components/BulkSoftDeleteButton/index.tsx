"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import { getTranslation } from "@payloadcms/translations";
import {
  Pill,
  toast,
  useConfig,
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

interface BulkSoftDeleteButtonProps {
  collectionSlug: string;
}

export const BulkSoftDeleteButton = (props: BulkSoftDeleteButtonProps) => {
  const { collectionSlug } = props;

  const { config, getEntityConfig } = useConfig();
  const { i18n, t } = useTranslation<TranslationsObject, TranslationsKeys>();
  const selection = useSelection();
  const router = useRouter();
  const { clearRouteCache } = useRouteCache();
  const { showSoftDeleted } = useSoftDelete();
  const [allowClick, setAllowClick] = useState(false);

  const collectionConfig = getEntityConfig({
    collectionSlug,
  }) as ClientCollectionConfig;

  const addDefaultError = useCallback(() => {
    toast.error(t("error:unknown"));
  }, [t]);

  const handleSoftDelete = async () => {
    try {
      if (!allowClick) {
        return;
      }

      const selectionArray = [...selection.selected.keys()].filter((key) =>
        selection.selected.get(key),
      );

      const response = await fetch(`${config.routes.api}/soft-delete`, {
        method: "POST",
        body: JSON.stringify({
          collection: collectionSlug,
          ids: selectionArray,
        }),
      });

      const json = await response.json();

      const plural = collectionConfig.labels.plural;
      const singular = collectionConfig.labels.singular;

      const softDeletedDocs = json?.docs?.length || 0;
      const successLabel = softDeletedDocs > 1 ? plural : singular;

      if (response.status < 400 || softDeletedDocs > 0) {
        toast.success(
          t("softDelete:deletedCountSuccessfully", {
            count: softDeletedDocs,
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

        return null;
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

  // Places the soft delete button alongside the list actions
  useEffect(() => {
    if (showSoftDeleted) {
      setAllowClick(false);

      return;
    }

    const listControlsButtonsWrap = document.querySelector(
      ".list-controls .list-controls__buttons-wrap",
    );

    const bulkSoftDeleteButton = document.getElementById(
      "bulk-soft-delete-button",
    );

    if (listControlsButtonsWrap && bulkSoftDeleteButton) {
      listControlsButtonsWrap.prepend(bulkSoftDeleteButton);

      setAllowClick(true);
    }
  }, [showSoftDeleted]);

  return (
    <div
      id="bulk-soft-delete-button"
      style={{
        display: !showSoftDeleted && selection.count ? "inherit" : "none",
      }}
    >
      <Pill onClick={handleSoftDelete} size="small">
        {t("softDelete:softDelete")}
      </Pill>
    </div>
  );
};
