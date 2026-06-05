"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { useDashboard } from "@/src/context/DashboardContext";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

export default function StatusPieChart() {
  const {
    excelData,
    filters,
  } = useDashboard();

  if (!excelData) return null;

  let tasks =
    excelData.MASTER_TASKS_COMPLETE || [];

  if (filters.project !== "All") {
    tasks = tasks.filter(
      (x: any) =>
        x.Project === filters.project
    );
  }

  if (filters.owner !== "All") {
    tasks = tasks.filter(
      (x: any) =>
        x.Owner === filters.owner
    );
  }

  if (
    filters.workstream !== "All"
  ) {
    tasks = tasks.filter(
      (x: any) =>
        x.Workstream ===
        filters.workstream
    );
  }

  const grouped = Object.entries(
    tasks.reduce(
      (acc: any, row: any) => {
        const phase =
          row.Phase || "Unknown";

        acc[phase] =
          (acc[phase] || 0) + 1;

        return acc;
      },
      {}
    )
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Phase Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={grouped}
              dataKey="value"
              label
            >
              {grouped.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}