function UpcomingReminders() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-4">
        Upcoming Reminders
      </h2>

      <div className="space-y-3">
        <div className="border p-3 rounded">
          <h3>Paracetamol</h3>
          <p>08:00 PM</p>
        </div>

        <div className="border p-3 rounded">
          <h3>Vitamin D</h3>
          <p>09:30 PM</p>
        </div>
      </div>
    </div>
  );
}

export default UpcomingReminders;