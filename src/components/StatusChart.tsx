"use client";

import { useDashboard } from "@/src/context/DashboardContext";

export default function StatusChart() {
  const {
    excelData,
    filters,
  } = useDashboard();

  if (!excelData) return null;

  let actions =
    excelData.MASTER_ACTIONS_COMPLETE || [];

  if (filters.project !== "All") {
    actions = actions.filter(
      (x: any) =>
        x.Project === filters.project
    );
  }

  if (filters.owner !== "All") {
    actions = actions.filter(
      (x: any) =>
        x.Owner === filters.owner
    );
  }

  if (filters.workstream !== "All") {
    actions = actions.filter(
      (x: any) =>
        x.Workstream ===
        filters.workstream
    );
  }

  const statusCounts: Record<
    string,
    number
  > = {};

  actions.forEach((action: any) => {
    const status =
      action.Status || "Unknown";

    statusCounts[status] =
      (statusCounts[status] || 0) + 1;
  });

  const data = Object.entries(
    statusCounts
  ).sort(
    (a: any, b: any) => b[1] - a[1]
  );

  const total =
    data.reduce(
      (sum: number, item: any) =>
        sum + item[1],
      0
    ) || 1;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-lg mb-6">
        Status Overview
      </h2>

      <div className="space-y-5">
        {data.map(
          ([status, count]: any) => {
            const percentage =
              Math.round(
                (count / total) * 100
              );

            return (
              <div key={status}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{status}</span>
                  <span>
                    {count} ({percentage}%)
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded h-4">
                  <div
                    className="bg-emerald-600 h-4 rounded"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
