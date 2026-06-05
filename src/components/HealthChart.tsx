"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useDashboard } from "@/src/context/DashboardContext";

export default function HealthChart() {
  const {
    excelData,
    filters,
  } = useDashboard();

  if (!excelData) return null;

  let projects =
    excelData.PROJECT_METADATA || [];

  if (filters.health !== "All") {
    projects = projects.filter(
      (x: any) =>
        x.Health === filters.health
    );
  }

  const grouped = Object.entries(
    projects.reduce(
      (acc: any, row: any) => {
        const health =
          row.Health || "Unknown";

        acc[health] =
          (acc[health] || 0) + 1;

        return acc;
      },
      {}
    )
  ).map(([health, count]) => ({
    health,
    count,
  }));

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Project Health
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={grouped}>
            <XAxis dataKey="health" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
