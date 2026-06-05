"use client";

import UploadExcel from "./UploadExcel";
import Filters from "./Filters";

export default function Sidebar() {
  return (
    <aside className="w-80 bg-slate-950 text-white min-h-screen p-6 border-r border-slate-800 overflow-y-auto">

      <h1 className="text-3xl font-bold mb-8">
        Program Dashboard
      </h1>

      <UploadExcel />

      <div className="border-t border-slate-800 my-6" />

      <h2 className="font-semibold mb-4">
        Filters
      </h2>

      <Filters />

      <div className="border-t border-slate-800 my-6" />


    </aside>
  );
}