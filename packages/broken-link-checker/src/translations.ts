import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  en: {
    brokenLinkChecker: {
      scanLinks: "Scan links",
      startNewScan: "Start new scan",
      scanningFailed: "There was an error while scanning for broken links. Please check your connection and try again.",
      scanningSucceeded: "Scanning for broken links was successful.",
      scanInProgress: "Scan in progress: {{elapsed}}",
      noScanInProgress: "No scan in progress.",
      somethingWentWrong: "Something went wrong.",
    },
  },
};

export type TranslationsObject = typeof translations.en;
export type TranslationsKeys = NestedKeysStripped<TranslationsObject>;
