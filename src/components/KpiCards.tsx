"use client";

import { useDashboard } from "@/src/context/DashboardContext";

export default function KpiCards() {
  const {
    excelData,
    filters,
  } = useDashboard();

  if (!excelData) return null;

  let tasks =
    excelData.MASTER_TASKS_COMPLETE || [];

  let actions =
    excelData.MASTER_ACTIONS_COMPLETE || [];

  const projectMeta =
    excelData.PROJECT_METADATA || [];

  /* TASK FILTERS */

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

  /* ACTION FILTERS */

  let filteredActions = actions.filter(
    (action: any) => {
      if (
        filters.project !== "All" &&
        action.Project !== filters.project
      )
        return false;

      if (
        filters.owner !== "All" &&
        action.Owner !== filters.owner
      )
        return false;

      if (
        filters.workstream !== "All" &&
        action.Workstream !==
          filters.workstream
      )
        return false;

      if (
        filters.status !== "All" &&
        action.Status !== filters.status
      )
        return false;

      return true;
    }
  );

  const materials =
    excelData.MASTER_MATERIALS_COMPLETE ||
    [];

  const projectCount =
    new Set(
      tasks.map(
        (x: any) => x.Project
      )
    ).size;

  const greenProjects =
    projectMeta.filter(
      (x: any) =>
        x.Health === "Green"
    ).length;

  const amberProjects =
    projectMeta.filter(
      (x: any) =>
        x.Health === "Amber"
    ).length;

  const redProjects =
    projectMeta.filter(
      (x: any) =>
        x.Health === "Red"
    ).length;

  const criticalProjects =
    projectMeta.filter(
      (x: any) =>
        x.Priority === "Critical"
    ).length;

  const completion =
    tasks.length > 0
      ? Math.round(
          ((tasks.length -
            filteredActions.length) /
            tasks.length) *
            100
        )
      : 0;

  const cards = [
    {
      title: "Projects",
      value: projectCount,
    },
    {
      title: "Tasks",
      value: tasks.length,
    },
    {
      title: "Actions",
      value: filteredActions.length,
    },
    {
      title: "Materials",
      value: materials.length,
    },
    {
      title: "Completion",
      value: `${completion}%`,
    },
    {
      title: "Green Projects",
      value: greenProjects,
    },
    {
      title: "Amber Projects",
      value: amberProjects,
    },
    {
      title: "Red Projects",
      value: redProjects,
    },
    {
      title: "Critical Projects",
      value: criticalProjects,
    },
  ];

  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <div className="text-gray-500">
            {card.title}
          </div>

          <div className="text-4xl font-bold mt-3">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
