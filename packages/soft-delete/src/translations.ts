import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  en: {
    softDelete: {
      deletedCountSuccessfully:
        "Soft deleted {{count}} {{label}} successfully.",
      titleDeleted: '{{label}} "{{title}}" successfully soft deleted.',
      restoredCountSuccessfully: "Restored {{count}} {{label}} successfully.",
      titleRestored: '{{label}} "{{title}}" successfully restored.',
      deletingTitle:
        "There was an error while soft deleting {{title}}. Please check your connection and try again.",
      restoringTitle:
        "There was an error while restoring {{title}}. Please check your connection and try again.",
    },
  },
};

export type TranslationsObject = typeof translations.en;
export type TranslationsKeys = NestedKeysStripped<TranslationsObject>;
