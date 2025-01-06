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

  const enableFullscreen = () => {
    body.classList.add("focus-mode");
    richTextField?.classList.add("focused-editor");
  };

  const disableFullscreen = () => {
    const defaultTemplate = body.querySelector(".template-default");
    defaultTemplate?.setAttribute("style", "transition: none;");
    setTimeout(() => defaultTemplate?.removeAttribute("style"), 150);
    body.classList.remove("focus-mode");
    richTextField?.classList.remove("focused-editor");
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
