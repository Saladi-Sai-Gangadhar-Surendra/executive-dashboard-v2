"use client";

import { useDashboard } from "@/src/context/DashboardContext";

export default function Filters() {
  const {
    excelData,
    filters,
    setFilters,
  } = useDashboard();

  if (!excelData) return null;

  const tasks =
    excelData.MASTER_TASKS_COMPLETE || [];

  const projects: any[] = [
    ...new Set(
      tasks
        .map((r: any) => r.Project)
        .filter(Boolean)
    ),
  ];

  const owners: any[] = [
    ...new Set(
      tasks
        .map((r: any) => r.Owner)
        .filter(Boolean)
    ),
  ];

  const workstreams: any[] = [
    ...new Set(
      tasks
        .map((r: any) => r.Workstream)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="space-y-4">
      {/* PROJECT */}

      <select
        value={filters.project}
        onChange={(e) =>
          setFilters({
            ...filters,
            project: e.target.value,
          })
        }
        className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white"
      >
        <option value="All">
          All Projects
        </option>

        {projects.map((project, index) => (
          <option
            key={index}
            value={project}
          >
            {project}
          </option>
        ))}
      </select>

      {/* OWNER */}

      <select
        value={filters.owner}
        onChange={(e) =>
          setFilters({
            ...filters,
            owner: e.target.value,
          })
        }
        className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white"
      >
        <option value="All">
          All Owners
        </option>

        {owners.map((owner, index) => (
          <option
            key={index}
            value={owner}
          >
            {owner}
          </option>
        ))}
      </select>

      {/* WORKSTREAM */}

      <select
        value={filters.workstream}
        onChange={(e) =>
          setFilters({
            ...filters,
            workstream: e.target.value,
          })
        }
        className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white"
      >
        <option value="All">
          All Workstreams
        </option>

        {workstreams.map((workstream, index) => (
          <option
            key={index}
            value={workstream}
          >
            {workstream}
          </option>
        ))}
      </select>
    </div>
  );
}