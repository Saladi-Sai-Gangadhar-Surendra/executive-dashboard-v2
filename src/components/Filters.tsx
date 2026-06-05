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

  const actions =
    excelData.MASTER_ACTIONS_COMPLETE || [];

  const projectMeta =
    excelData.PROJECT_METADATA || [];

  const phaseMaster =
    excelData.PHASE_MASTER || [];

  const projects = [
    ...new Set(
      tasks
        .map((r: any) => r.Project)
        .filter(Boolean)
    ),
  ];

  const owners = [
    ...new Set(
      tasks
        .map((r: any) => r.Owner)
        .filter(Boolean)
    ),
  ];

  const workstreams = [
    ...new Set(
      tasks
        .map((r: any) => r.Workstream)
        .filter(Boolean)
    ),
  ];

  const phases = [
    ...new Set(
      phaseMaster
        .map((r: any) => r.Phase)
        .filter(Boolean)
    ),
  ];

  const categories = [
    ...new Set(
      phaseMaster
        .map((r: any) => r.Category)
        .filter(Boolean)
    ),
  ];

  const healths = [
    ...new Set(
      projectMeta
        .map((r: any) => r.Health)
        .filter(Boolean)
    ),
  ];

  const priorities = [
    ...new Set(
      projectMeta
        .map((r: any) => r.Priority)
        .filter(Boolean)
    ),
  ];

  const statuses = [
    ...new Set(
      actions
        .map((r: any) => r.Status)
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
          <option key={index} value={project}>
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
          <option key={index} value={owner}>
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
          <option key={index} value={workstream}>
            {workstream}
          </option>
        ))}
      </select>

      {/* PHASE */}

      <select
        value={filters.phase}
        onChange={(e) =>
          setFilters({
            ...filters,
            phase: e.target.value,
          })
        }
        className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white"
      >
        <option value="All">
          All Phases
        </option>

        {phases.map((phase, index) => (
          <option key={index} value={phase}>
            {phase}
          </option>
        ))}
      </select>

      {/* STATUS */}

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({
            ...filters,
            status: e.target.value,
          })
        }
        className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white"
      >
        <option value="All">
          All Status
        </option>

        {statuses.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* HEALTH */}

      <select
        value={filters.health}
        onChange={(e) =>
          setFilters({
            ...filters,
            health: e.target.value,
          })
        }
        className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white"
      >
        <option value="All">
          All Health
        </option>

        {healths.map((health, index) => (
          <option key={index} value={health}>
            {health}
          </option>
        ))}
      </select>

      {/* PRIORITY */}

      <select
        value={filters.priority}
        onChange={(e) =>
          setFilters({
            ...filters,
            priority: e.target.value,
          })
        }
        className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white"
      >
        <option value="All">
          All Priorities
        </option>

        {priorities.map((priority, index) => (
          <option key={index} value={priority}>
            {priority}
          </option>
        ))}
      </select>

    </div>
  );
}
