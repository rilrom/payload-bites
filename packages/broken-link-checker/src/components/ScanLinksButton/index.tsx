"use client";

import { useCallback } from "react";
import {
  Button,
  toast,
  useConfig,
  useRouteCache,
  useTranslation,
} from "@payloadcms/ui";
import { TranslationsKeys, TranslationsObject } from "../../translations.js";

export const ScanLinksButton = () => {
  const { config } = useConfig();
  const { clearRouteCache } = useRouteCache();
  const { t } = useTranslation<TranslationsObject, TranslationsKeys>();

  const addDefaultError = useCallback(() => {
    toast.error(t("brokenLinkChecker:scanningFailed"));
  }, [t]);

  const handleScan = async () => {
    try {
      const response = await fetch(`${config.routes.api}/scan-links`, {
        method: "POST",
        body: JSON.stringify({}),
      });

      const json = await response.json();

      if (response.status < 400) {
        toast.success(t("brokenLinkChecker:scanningSucceeded") || json.message);

        clearRouteCache();

        return;
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

  return (
    <Button onClick={handleScan}>{t("brokenLinkChecker:scanLinks")}</Button>
  );
};
