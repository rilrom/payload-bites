import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
