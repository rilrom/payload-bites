"use client";

import { useEffect } from "react";

import { useSoftDelete } from "../SoftDeleteProvider/index.client.js";

export const ToggleButton = () => {
  const { showSoftDeleted, toggleSoftDelete } = useSoftDelete();

  const handleClick = () => {
    if (showSoftDeleted) {
      toggleSoftDelete(false);
    } else {
      toggleSoftDelete(true);
    }
  };

  // Moves the toggle button near the heading
  useEffect(() => {
    const listHeader = document.querySelector(".list-header");
    const collectionListSubheader = document.querySelector(
      ".collection-list__sub-header",
    );

    const toggleButton = document.getElementById("toggle-button");

    if (listHeader && collectionListSubheader && toggleButton) {
      listHeader.insertBefore(toggleButton, collectionListSubheader);

      toggleButton.style.display = "inherit";
    }
  }, []);

  return (
    <button
      type="button"
      id="toggle-button"
      className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
      style={{ display: "none" }}
      onClick={handleClick}
    >
      {`View ${showSoftDeleted ? "Active" : "Deleted"} Documents`}
    </button>
  );
};
