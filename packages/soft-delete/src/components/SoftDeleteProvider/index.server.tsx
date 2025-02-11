import React from "react";
import { cookies } from "next/headers.js";

import { SoftDeleteProviderClient } from "./index.client.js";

interface SoftDeleteProviderRscProps {
  children: React.ReactNode;
}

export const SoftDeleteProviderRsc = async (
  props: SoftDeleteProviderRscProps,
) => {
  const { children } = props;

  const cookieStore = await cookies();

  const softDeleteCookie = cookieStore.get("payload-soft-delete")?.value;

  return (
    <SoftDeleteProviderClient softDelete={softDeleteCookie}>
      {children}
    </SoftDeleteProviderClient>
  );
};
