import { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";
import { useEditorConfigContext } from "@payloadcms/richtext-lexical/client";

import { FullscreenIcon } from "../FullscreenIcon/index.js";
import { toggleFullscreen } from "../../utils/toggleFullscreen.js";

interface FullscreenButtonProps {
  editor: LexicalEditor;
}

export const FullscreenButton = (props: FullscreenButtonProps) => {
  const { editor } = props;

  const editorConfigContext = useEditorConfigContext();

  const isDisabled = editorConfigContext.parentEditor.uuid;

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    toggleFullscreen({ editor });
  };

  return (
    <button
      type="button"
      className={`toolbar-popup__button toolbar-popup__button-toggleFullscreen${isDisabled ? " disabled" : ""}`}
      onClick={handleClick}
    >
      <FullscreenIcon />
    </button>
  );
};
