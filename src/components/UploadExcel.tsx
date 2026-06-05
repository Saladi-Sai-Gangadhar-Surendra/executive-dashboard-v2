"use client";

import * as XLSX from "xlsx";
import { useDashboard } from "@/src/context/DashboardContext";

export default function UploadExcel() {
  const { setExcelData } = useDashboard();

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const sheets: any = {};

      workbook.SheetNames.forEach((name) => {
        sheets[name] = XLSX.utils.sheet_to_json(
          workbook.Sheets[name],
          {
            defval: "",
          }
        );
      });

      console.log("================================");
      console.log("AVAILABLE SHEETS");
      console.log(workbook.SheetNames);
      console.log("================================");

      workbook.SheetNames.forEach((name) => {
        console.log(
          `${name} -> ${sheets[name]?.length || 0} rows`
        );
      });

      setExcelData(sheets);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-2">
        Upload Excel
      </label>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleUpload}
        className="w-full"
      />
    </div>
  );
}
