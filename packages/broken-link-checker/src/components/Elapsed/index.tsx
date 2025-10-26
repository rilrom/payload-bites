"use client";

import { useTranslation } from "@payloadcms/ui";
import { formatDuration, intervalToDuration } from "date-fns";

import { TranslationsKeys, TranslationsObject } from "../../translations.js";

interface ElapsedProps {
  job?: any;
}

export const Elapsed = (props: ElapsedProps) => {
  const { job } = props;

  const { t } = useTranslation<TranslationsObject, TranslationsKeys>();

  const duration = job
    ? intervalToDuration({
        start: new Date(job.createdAt),
        end: new Date(),
      })
    : null;

  const elapsed = duration ? formatDuration(duration, { format: ["hours", "minutes", "seconds"] }) : null;

  return <p>{job ? t("brokenLinkChecker:scanInProgress", { elapsed }) : t("brokenLinkChecker:noScanInProgress")}</p>;
};
