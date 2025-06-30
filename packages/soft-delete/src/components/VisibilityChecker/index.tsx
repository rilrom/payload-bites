"use client";

import { type Field } from "payload";
import { useEffect } from "react";

import { areAllDirectElementsHidden } from "../../utils/areAllDirectElementsHidden.js";

import "./index.scss";

interface VisibilityCheckerProps {
  collectionSlug: string;
  enabledCollections?: string[];
  field?: Field;
}

export const VisibilityChecker = (props: VisibilityCheckerProps) => {
  useEffect(() => {
    const listEnabledCollections = props.enabledCollections || [];
    const listCollectionSlug = props.collectionSlug;

    const listView = document.querySelector(".collection-list");

    if (listView && listEnabledCollections.includes(listCollectionSlug)) {
      listView.setAttribute("data-soft-delete-collection", "true");
    }
  }, [props.collectionSlug, props.enabledCollections]);

  useEffect(() => {
    const editEnabledCollections =
      props.field?.admin?.custom?.enabledCollections || [];
    const editCollectionSlug = props.field?.admin?.custom?.collectionSlug;

    const editView = document.querySelector(".collection-edit");

    if (editView && editEnabledCollections.includes(editCollectionSlug)) {
      editView.setAttribute("data-soft-delete-collection", "true");
    }
  }, [
    props.field?.admin?.custom?.collectionSlug,
    props.field?.admin?.custom?.enabledCollections,
  ]);

  useEffect(() => {
    const editScreen = document.querySelector<HTMLElement>(
      ".collection-edit.collection-edit--is-editing",
    );

    if (!editScreen) {
      return;
    }

    const docControlsControlsWrapper = editScreen.querySelector<HTMLElement>(
      ".doc-controls__controls-wrapper",
    );

    if (!docControlsControlsWrapper) {
      return;
    }

    const docControlsPopup =
      docControlsControlsWrapper.querySelector<HTMLElement>(
        ".doc-controls__popup",
      );

    if (!docControlsPopup) {
      return;
    }

    const popupButtonList =
      docControlsPopup.querySelector<HTMLElement>(".popup-button-list");

    if (!popupButtonList) {
      return;
    }

    if (areAllDirectElementsHidden(popupButtonList)) {
      docControlsPopup.style.display = "none";
    }
  }, []);

  return null;
};
