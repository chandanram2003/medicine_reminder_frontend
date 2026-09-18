function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-4">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Medicine
        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          View Medicines
        </button>
      </div>
    </div>
  );
}

export default QuickActions;