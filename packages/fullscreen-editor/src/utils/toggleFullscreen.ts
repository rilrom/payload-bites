import type { LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { getLastMatchingAncestor } from "./getLastMatchingAncestor.js";

const getRichTextLexical = (editor?: LexicalEditor) =>
	getLastMatchingAncestor(editor?.getRootElement(), ".rich-text-lexical");

export const isFullscreen = (editor?: LexicalEditor) =>
	document.body.classList.contains("focus-mode") &&
	(getRichTextLexical(editor)?.classList.contains("focused-editor") ?? false);

export const toggleFullscreen = ({
	editor,
	mode = "toggle",
}: {
	editor?: LexicalEditor;
	mode?: "toggle" | "enable" | "disable";
}) => {
	const body = document.body;
	const richTextLexical = getRichTextLexical(editor);
	const drawerContentChildren = richTextLexical?.closest(
		".drawer__content-children",
	);

	const enableFullscreen = () => {
		const scrollPosition = drawerContentChildren
			? drawerContentChildren.scrollTop
			: window.scrollY;

		if (!Number.isNaN(scrollPosition)) {
			body.setAttribute("data-position", scrollPosition.toString());
		}

		body.classList.add("focus-mode");
		richTextLexical?.classList.add("focused-editor");
	};

	const disableFullscreen = () => {
		richTextLexical?.classList.remove("focused-editor");

		if (!body.querySelector(".focused-editor")) {
			body.classList.remove("focus-mode");
		}

		const scrollPosition = body.getAttribute("data-position");

		if (scrollPosition && !Number.isNaN(Number(scrollPosition))) {
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
