import type { NestedKeysStripped } from "@payloadcms/translations";
import { enTranslations } from "@payloadcms/translations/languages/en";

export const translations = {
  en: {
    contentFreeze: {
      bannerTitle: "Content Freeze Active",
      settingsLabel: "Content Freeze Settings",
      enableContentFreezeLabel: "Enable content freeze",
      enableContentFreezeDescription:
        "Enable content freeze to prevent create, update, and delete operations on specified collections and globals.",
      messageLabel: "Banner Message",
      messageDescription: "Optionally provide an explanation for the content freeze.",
      collectionsDescription: "Select collections to freeze.",
      globalsDescription: "Select globals to freeze.",
    },
  },
};

export type TranslationsObject = typeof translations.en & typeof enTranslations;
export type TranslationsKeys = NestedKeysStripped<TranslationsObject>;
