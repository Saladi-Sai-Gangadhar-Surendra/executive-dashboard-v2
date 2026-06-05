"use client";

import { createContext, useContext, useState } from "react";

const ViewContext = createContext<any>(null);

export function ViewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeView, setActiveView] =
    useState("overview");

  return (
    <ViewContext.Provider
      value={{
        activeView,
        setActiveView,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
}