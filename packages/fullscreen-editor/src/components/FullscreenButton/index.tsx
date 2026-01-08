import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { toggleFullscreen } from "../../utils/toggleFullscreen.js";
import { FullscreenIcon } from "../FullscreenIcon/index.js";

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
