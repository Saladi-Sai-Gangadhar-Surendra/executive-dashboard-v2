"use client";

import { useDashboard } from "@/src/context/DashboardContext";

export default function ProjectChart() {
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
        x.Workstream === filters.workstream
    );
  }

  const projectCounts: Record<
    string,
    number
  > = {};

  tasks.forEach((task: any) => {
    const project =
      task.Project || "Unknown";

    projectCounts[project] =
      (projectCounts[project] || 0) + 1;
  });

  const data = Object.entries(
    projectCounts
  ).sort(
    (a: any, b: any) => b[1] - a[1]
  );

  const max =
    Math.max(
      ...data.map((x: any) => x[1]),
      1
    );

  return (
    <div className="bg-white rounded-xl shadow p-6 h-auto">
      <h2 className="font-bold text-lg mb-6">
        Project Distribution
      </h2>

      <div className="space-y-5">
        {data.map(
          ([project, count]: any) => (
            <div key={project}>
              <div className="flex justify-between text-sm mb-1">
                <span>{project}</span>
                <span>{count}</span>
              </div>

              <div className="w-full bg-slate-200 rounded h-4">
                <div
                  className="bg-blue-600 h-4 rounded"
                  style={{
                    width: `${(count / max) * 100}%`,
                  }}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
