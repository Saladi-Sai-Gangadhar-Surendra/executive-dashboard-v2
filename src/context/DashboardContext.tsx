"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const DashboardContext = createContext<any>(null);

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [excelData, setExcelData] =
    useState<any>(null);

  const [filters, setFilters] =
    useState({
      project: "All",
      owner: "All",
      workstream: "All",
    });

  return (
    <DashboardContext.Provider
      value={{
        excelData,
        setExcelData,
        filters,
        setFilters,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}