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

  if (filters.workstream !== "All") {
    tasks = tasks.filter(
      (x: any) =>
        x.Workstream ===
        filters.workstream
    );
  }

  if (filters.phase !== "All") {
    tasks = tasks.filter(
      (x: any) =>
        x.Phase === filters.phase
    );
  }

  if (filters.status !== "All") {
    tasks = tasks.filter(
      (x: any) =>
        x.Status === filters.status
    );
  }

  if (filters.health !== "All") {
    tasks = tasks.filter(
      (x: any) =>
        x.Health === filters.health
    );
  }

  if (filters.priority !== "All") {
    tasks = tasks.filter(
      (x: any) =>
        x.Priority ===
        filters.priority
    );
  }

  const grouped = Object.entries(
    tasks.reduce(
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
