import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  en: {
    imageSearch: {
      searchImages: "Search images",
      noResults: "No results",
      imageLibrary: "Image library powered by {{provider}}",
    },
  },
};

export type TranslationsObject = typeof translations.en;
export type TranslationsKeys = NestedKeysStripped<TranslationsObject>;
