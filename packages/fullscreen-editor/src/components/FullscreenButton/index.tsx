import { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";
import { useEditorConfigContext } from "@payloadcms/richtext-lexical/client";

import { FullscreenIcon } from "../FullscreenIcon/index.js";

interface FullscreenButtonProps {
  editor: LexicalEditor;
}

export const FullscreenButton = (props: FullscreenButtonProps) => {
  const { editor } = props;

  const editorConfigContext = useEditorConfigContext();

  const handleClick = () => {
    if (editorConfigContext.parentEditor.uuid) {
      return;
    }

    const body = document.body;
    const root = editor.getRootElement();
    const defaultTemplate = body.querySelector(".template-default");
    const richTextField = root?.closest(".rich-text-lexical");

    if (body.classList.contains("focus-mode")) {
      defaultTemplate?.setAttribute("style", "transition: none;");
      body.classList.remove("focus-mode");
      richTextField?.classList.remove("focused-editor");
      setTimeout(() => defaultTemplate?.removeAttribute("style"), 150);
    } else {
      body.classList.add("focus-mode");
      richTextField?.classList.add("focused-editor");
    }
  };

  return (
    <button
      type="button"
      className={`toolbar-popup__button toolbar-popup__button-toggleFullscreen${editorConfigContext.parentEditor.uuid ? " disabled" : ""}`}
      onClick={handleClick}
    >
      <FullscreenIcon />
    </button>
  );
};
