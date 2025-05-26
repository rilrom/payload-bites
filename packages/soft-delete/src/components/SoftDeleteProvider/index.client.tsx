"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation.js";

interface SoftDeleteContext {
  toggleSoftDelete: (value: boolean) => void;
  showSoftDeleted: boolean;
}

interface SoftDeleteProviderClientProps {
  children: React.ReactNode;
  softDelete?: string;
}

const SoftDeleteContext = createContext<SoftDeleteContext | null>(null);

export const SoftDeleteProviderClient = (
  props: SoftDeleteProviderClientProps,
) => {
  const { children, softDelete } = props;

  const router = useRouter();

  const [showSoftDeleted, setShowSoftDeleted] = useState(Boolean(softDelete));

  const setCookie = useCallback((value: string) => {
    const expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = "payload-soft-delete=" + value + expires + "; path=/";
  }, []);

  const deleteCookie = useCallback(() => {
    document.cookie =
      "payload-soft-delete=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }, []);

  const toggleSoftDelete = useCallback(
    (value: boolean) => {
      if (value) {
        setShowSoftDeleted(true);
        setCookie("true");
      } else {
        setShowSoftDeleted(false);
        deleteCookie();
      }

      router.refresh();
    },
    [setCookie, deleteCookie, setShowSoftDeleted, router],
  );

  return (
    <span data-soft-delete-enabled={showSoftDeleted}>
      <SoftDeleteContext.Provider
        value={{
          toggleSoftDelete,
          showSoftDeleted,
        }}
      >
        {children}
      </SoftDeleteContext.Provider>
    </span>
  );
};

export const useSoftDelete = () => {
  const context = useContext(SoftDeleteContext);

  if (!context) {
    throw new Error("useSoftDelete must be used within SoftDeleteContext");
  }

  return context;
};
