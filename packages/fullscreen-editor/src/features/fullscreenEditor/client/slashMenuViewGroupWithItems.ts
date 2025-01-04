import type {
  SlashMenuGroup,
  SlashMenuItem,
} from "@payloadcms/richtext-lexical";

export function slashMenuViewGroupWithItems(
  items: SlashMenuItem[],
): SlashMenuGroup {
  return {
    items,
    key: "view",
    label: ({ i18n }) => {
      return i18n.t("lexical:fullscreenEditor:group");
    },
  };
}
