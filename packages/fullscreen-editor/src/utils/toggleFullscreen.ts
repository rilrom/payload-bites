import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

export const toggleFullscreen = ({
  editor,
  mode = "toggle",
}: {
  editor?: LexicalEditor;
  mode?: "toggle" | "enable" | "disable";
}) => {
  const body = document.body;
  const root = editor?.getRootElement();
  const richTextField = root?.closest(".rich-text-lexical");
  const drawer = root?.closest(".drawer__content-children");

  const enableFullscreen = () => {
    const scrollPosition = drawer ? drawer.scrollTop : window.scrollY;

    if (!isNaN(scrollPosition)) {
      body.setAttribute("data-position", scrollPosition.toString());
    }

    body.classList.add("focus-mode");
    richTextField?.classList.add("focused-editor");
  };

  const disableFullscreen = () => {
    const defaultTemplate = body.querySelector(".template-default");
    defaultTemplate?.setAttribute("style", "transition: none;");
    body.classList.remove("focus-mode");
    richTextField?.classList.remove("focused-editor");
    setTimeout(() => defaultTemplate?.removeAttribute("style"), 150);

    const scrollPosition = body.getAttribute("data-position");

    if (scrollPosition && !isNaN(Number(scrollPosition))) {
      (drawer ?? window).scrollTo(0, Number(scrollPosition));
    }
  };

  if (mode === "enable") {
    return enableFullscreen();
  }

  if (mode === "disable") {
    return disableFullscreen();
  }

  if (body.classList.contains("focus-mode")) {
    disableFullscreen();
  } else {
    enableFullscreen();
  }
};
