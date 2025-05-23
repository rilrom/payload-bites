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

interface BulkRestoreButtonProps {
  collectionSlug: string;
  enabled: boolean;
}

export const BulkRestoreButton = (props: BulkRestoreButtonProps) => {
  const { collectionSlug, enabled } = props;

  const { config, getEntityConfig } = useConfig();
  const { i18n, t } = useTranslation<TranslationsObject, TranslationsKeys>();
  const selection = useSelection();
  const router = useRouter();
  const { clearRouteCache } = useRouteCache();
  const { showSoftDeleted } = useSoftDelete();
  const [allowRestore, setAllowRestore] = useState(false);

  const collectionConfig = getEntityConfig({
    collectionSlug,
  }) as ClientCollectionConfig;

  const addDefaultError = useCallback(() => {
    toast.error(t("error:unknown"));
  }, [t]);

  const handleRestore = async () => {
    try {
      if (!enabled || !allowRestore) {
        return;
      }

      const selectionArray = [...selection.selected.keys()].filter((key) =>
        selection.selected.get(key),
      );

      const response = await fetch(`${config.routes.api}/restore`, {
        method: "POST",
        body: JSON.stringify({
          collection: collectionSlug,
          ids: selectionArray,
        }),
      });

      const json = await response.json();

      const plural = collectionConfig.labels.plural;
      const singular = collectionConfig.labels.singular;

      const restoredDocs = json?.docs?.length || 0;
      const successLabel = restoredDocs > 1 ? plural : singular;

      if (response.status < 400 || restoredDocs > 0) {
        toast.success(
          t("softDelete:restoredCountSuccessfully", {
            count: restoredDocs,
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

  // Places the restore button alongside the list actions
  useEffect(() => {
    if (!enabled || !showSoftDeleted) {
      setAllowRestore(false);

      return;
    }

    const listControlsButtonsWrap = document.querySelector(
      ".list-controls .list-controls__buttons-wrap",
    );

    const bulkRestoreButton = document.getElementById("bulk-restore-button");

    if (listControlsButtonsWrap && bulkRestoreButton) {
      listControlsButtonsWrap.prepend(bulkRestoreButton);

      setAllowRestore(true);
    }
  }, [enabled, showSoftDeleted]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      id="bulk-restore-button"
      style={{
        display: showSoftDeleted && selection.count ? "inherit" : "none",
      }}
    >
      <Pill onClick={handleRestore} size="small">
        {t("softDelete:restore")}
      </Pill>
    </div>
  );
};
