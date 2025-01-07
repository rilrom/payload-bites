import { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { FullscreenIcon } from "../FullscreenIcon/index.js";
import { toggleFullscreen } from "../../utils/toggleFullscreen.js";

interface FullscreenButtonProps {
  editor: LexicalEditor;
}

export const FullscreenButton = (props: FullscreenButtonProps) => {
  const { editor } = props;

  return (
    <button
      type="button"
      className={`toolbar-popup__button toolbar-popup__button-toggleFullscreen`}
      onClick={() => toggleFullscreen({ editor })}
    >
      <FullscreenIcon />
    </button>
  );
};
