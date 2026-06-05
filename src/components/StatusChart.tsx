export default function StatusChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-80">
      <h2 className="font-bold text-lg mb-4">
        Status Overview
      </h2>

      <div className="space-y-4">
        <div>Completed: 82%</div>
        <div>In Progress: 12%</div>
        <div>Open: 6%</div>
      </div>
    </div>
  );
}