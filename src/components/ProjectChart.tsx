export default function ProjectChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-80">
      <h2 className="font-bold text-lg mb-4">
        Project Distribution
      </h2>

      <div className="space-y-4">
        <div>
          NeuroBiplane
          <div className="h-4 bg-blue-500 rounded mt-1 w-10/12"></div>
        </div>

        <div>
          Flex Floor
          <div className="h-4 bg-green-500 rounded mt-1 w-8/12"></div>
        </div>

        <div>
          CardiacBiplane
          <div className="h-4 bg-purple-500 rounded mt-1 w-6/12"></div>
        </div>
      </div>
    </div>
  );
}