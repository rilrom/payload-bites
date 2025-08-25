import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { getLastMatchingAncestor } from "./getLastMatchingAncestor.js";

export const toggleFullscreen = ({
  editor,
  mode = "toggle",
}: {
  editor?: LexicalEditor;
  mode?: "toggle" | "enable" | "disable";
}) => {
  const body = document.body;
  const root = editor?.getRootElement();
  const richTextLexical = getLastMatchingAncestor(root, ".rich-text-lexical");
  const drawerContent = root?.closest(".drawer__content");
  const drawerContentChildren = drawerContent?.querySelector(".drawer__content-children");

  const enableFullscreen = () => {
    // If in a drawer, we want to use the scroll value of the drawer not the window
    const scrollPosition = drawerContentChildren ? drawerContentChildren.scrollTop : window.scrollY;

    if (!isNaN(scrollPosition)) {
      body.setAttribute("data-position", scrollPosition.toString());
    }

    // The replace() is here to handle the before and after this PR being merged in to ensure all v3 versions still work
    // https://github.com/payloadcms/payload/pull/10411
    const originalDrawerStyles = drawerContent
      ?.getAttribute("style")
      ?.replace(/[()[\]{}][^a-zA-Z0-9]*$|[^a-zA-Z0-9]+$/, "");

    drawerContent?.setAttribute("style", "width: 100%;");

    if (originalDrawerStyles) {
      drawerContent?.setAttribute("data-width", originalDrawerStyles);
    }

    body.classList.add("focus-mode");
    richTextLexical?.classList.add("focused-editor");
  };

  const disableFullscreen = () => {
    const defaultTemplate = body.querySelector(".template-default");
    defaultTemplate?.setAttribute("style", "transition: none;");
    setTimeout(() => defaultTemplate?.removeAttribute("style"), 150);

    richTextLexical?.classList.remove("focused-editor");

    // This ensures focus mode remains enabled for parent editors if removing from child editors
    if (!body.querySelector(".focused-editor")) {
      body.classList.remove("focus-mode");
    }

    const originalDrawerStyles = drawerContent?.getAttribute("data-width");

    if (originalDrawerStyles) {
      drawerContent?.setAttribute("style", `${originalDrawerStyles}))); transition: none;`);
      setTimeout(() => drawerContent?.setAttribute("style", originalDrawerStyles), 150);
    }

    const scrollPosition = body.getAttribute("data-position");

    if (scrollPosition && !isNaN(Number(scrollPosition))) {
      (drawerContentChildren ?? window).scrollTo(0, Number(scrollPosition));
    }
  };

  if (mode === "enable") {
    return enableFullscreen();
  }

  if (mode === "disable") {
    return disableFullscreen();
  }

  if (richTextLexical?.classList.contains("focused-editor")) {
    disableFullscreen();
  } else {
    enableFullscreen();
  }
};
