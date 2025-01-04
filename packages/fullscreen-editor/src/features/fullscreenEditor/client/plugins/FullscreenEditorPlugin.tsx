"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import type { PluginComponent } from "@payloadcms/richtext-lexical";

import "./index.scss";

export const FullscreenEditorPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext();

  // This is needed to ensure fullscreen mode is properly disabled when a user clicks outside a drawer
  useEffect(() => {
    return () => {
      const body = document.body;
      const root = editor.getRootElement();
      const defaultTemplate = body.querySelector(".template-default");
      const richTextField = root?.closest(".rich-text-lexical");

      defaultTemplate?.setAttribute("style", "transition: none;");
      body.classList.remove("focus-mode");
      richTextField?.classList.remove("focused-editor");
      setTimeout(() => defaultTemplate?.removeAttribute("style"), 150);
    };
  }, [editor]);

  return null;
};
