import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  en: {
    imageSearch: {
      searchImages: "Search images",
      noResults: "No results",
      imageLibrary: "Image library powered by {{provider}}",
      previewImage: "Preview image",
      selectImage: "Select image",
      providerNotSupported: "Provider is not supported.",
      providerNotConfigured: "Provider has not been configured correctly.",
    },
  },
};

export type TranslationsObject = typeof translations.en;
export type TranslationsKeys = NestedKeysStripped<TranslationsObject>;
