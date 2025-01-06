"use client";

import { useEffect } from "react";
import type { PluginComponent } from "@payloadcms/richtext-lexical";

import { toggleFullscreen } from "../../../../utils/toggleFullscreen.js";

import "./index.scss";

export const FullscreenEditorPlugin: PluginComponent = () => {
  // This is needed to ensure fullscreen mode is properly disabled when a user clicks outside a drawer
  useEffect(() => {
    return () => toggleFullscreen({ mode: "disable" });
  }, []);

  return null;
};
