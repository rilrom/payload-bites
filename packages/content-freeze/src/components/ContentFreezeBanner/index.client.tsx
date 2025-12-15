"use client";

import "./index.scss";

import { useTranslation, WarningIcon } from "@payloadcms/ui";

import { TranslationsKeys, TranslationsObject } from "../../translations.js";

interface ContentFreezeBannerProps {
  enableContentFreeze: boolean;
  message?: string;
}

export const ContentFreezeBannerClient = (props: ContentFreezeBannerProps) => {
  const { enableContentFreeze, message } = props;

  const { t } = useTranslation<TranslationsObject, TranslationsKeys>();

  if (!enableContentFreeze) {
    return null;
  }

  return (
    <div className="content-freeze-banner gutter gutter--left gutter--right">
      <div className="content-freeze-banner__container">
        <div className="content-freeze-banner__icon">
          <WarningIcon />
        </div>
        <div className="content-freeze-banner__content">
          <strong className="content-freeze-banner__title">{t("contentFreeze:bannerTitle")}</strong>
          {message && <span className="content-freeze-banner__message">{message}</span>}
        </div>
      </div>
    </div>
  );
};
