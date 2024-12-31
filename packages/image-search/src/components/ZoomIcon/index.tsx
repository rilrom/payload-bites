import React from "react";

import "./index.scss";

export const ZoomIcon: React.FC = () => (
  <svg
    className="icon icon--zoom"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <circle
      cx="14"
      cy="14"
      r="12"
      className="stroke"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 23 L30 30"
      className="stroke"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12 L9 9 12 9 M16 9 L19 9 19 12 M9 16 L9 19 12 19 M19 16 L19 19 16 19"
      className="stroke"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
