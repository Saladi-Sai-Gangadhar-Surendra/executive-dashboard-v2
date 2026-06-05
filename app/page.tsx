"use client";

import Sidebar from "@/src/components/Sidebar";
import KpiCards from "@/src/components/KpiCards";

import StatusPieChart from "@/src/components/StatusPieChart";
import ProjectBarChart from "@/src/components/ProjectBarChart";

import { useDashboard } from "@/src/context/DashboardContext";

export default function Home() {
  const { excelData } = useDashboard();

  if (!excelData) {
    return (
      <main className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-lg text-center">
            <h1 className="text-4xl font-bold mb-4">
              Upload Excel Workbook
            </h1>

            <p className="text-gray-500">
              Upload your dashboard workbook from the left panel
              to start building the dashboard.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-5xl font-bold mb-8">
          Executive Program Dashboard
        </h1>

        <KpiCards />

        <div className="grid grid-cols-2 gap-6 mt-6">
          <StatusPieChart />
          <ProjectBarChart />
        </div>

      </div>
    </main>
  );
}