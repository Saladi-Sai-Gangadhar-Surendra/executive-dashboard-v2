"use client";

import { useDashboard } from "@/src/context/DashboardContext";

export default function FilteredProjectsTable() {
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

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Filtered Records
      </h2>

      <div className="overflow-auto max-h-[500px]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">
                Project
              </th>

              <th className="text-left p-2">
                Workstream
              </th>

              <th className="text-left p-2">
                Owner
              </th>

              <th className="text-left p-2">
                Phase
              </th>

              <th className="text-left p-2">
                Task
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(
              (
                row: any,
                index: number
              ) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-2">
                    {row.Project}
                  </td>

                  <td className="p-2">
                    {row.Workstream}
                  </td>

                  <td className="p-2">
                    {row.Owner}
                  </td>

                  <td className="p-2">
                    {row.Phase}
                  </td>

                  <td className="p-2">
                    {row.Task}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
