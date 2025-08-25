import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  en: {
    brokenLinkChecker: {
      scanningFailed: "There was an error while scanning for broken links. Please check your connection and try again.",
      scanningSucceeded: "Scanning for broken links was successful.",
      scanLinks: "Scan links",
    },
  },
};

export type TranslationsObject = typeof translations.en;
export type TranslationsKeys = NestedKeysStripped<TranslationsObject>;
