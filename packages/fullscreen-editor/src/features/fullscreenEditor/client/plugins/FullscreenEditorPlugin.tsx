"use client";

import "./index.scss";

import type { PluginComponent } from "@payloadcms/richtext-lexical";
import { useEffect } from "react";

export const FullscreenEditorPlugin: PluginComponent = () => {
	useEffect(() => {
		return () => {
			if (!document.body.querySelector(".focused-editor")) {
				document.body.classList.remove("focus-mode");
				document.body.removeAttribute("data-position");
			}
		};
	}, []);

	return null;
};
