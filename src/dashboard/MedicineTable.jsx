import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MedicineTable() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    medicines: [],
  });

  const [reminders, setReminders] = useState({});
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const token = localStorage.getItem("token");

  // =========================
  // GET MEDICINES
  // =========================
  useEffect(() => {
    getMedicines();
  }, []);

  const getMedicines = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("❌ User ID not found");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/medicines/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.log("Get Medicines Error:", error);
      toast.error("Medicines fetch nahi ho saki");
    }
  };

  // =========================
  // SELECT / UNSELECT MEDICINE
  // =========================
  const handleSelect = (id) => {
    setSelectedMedicines((prev) =>
      prev.includes(id)
        ? prev.filter((medicineId) => medicineId !== id)
        : [...prev, id]
    );
  };

  // =========================
  // SELECT ALL
  // =========================
  const handleSelectAll = () => {
    if (
      user.medicines.length > 0 &&
      selectedMedicines.length === user.medicines.length
    ) {
      setSelectedMedicines([]);
    } else {
      setSelectedMedicines(
        user.medicines.map((medicine) => medicine._id)
      );
    }
  };

  // =========================
  // DELETE SINGLE MEDICINE
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `
https://medicine-reminder-w53k.onrender.com/api/medicines/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      setSelectedMedicines((prev) =>
        prev.filter((medicineId) => medicineId !== id)
      );

      getMedicines();
    } catch (error) {
      console.log("Delete Error:", error);
      toast.error("Failed to delete medicine");
    }
  };

  // =========================
  // DELETE SELECTED MEDICINES
  // =========================
  const handleDeleteSelected = async () => {
    if (selectedMedicines.length === 0) {
      toast.warning("Please select at least one medicine");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedMedicines.length} medicine(s)?`
    );

    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedMedicines.map((id) =>
          axios.delete(
            `https://medicine-reminder-w53k.onrender.com/api/medicines/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      toast.success("Selected medicines deleted successfully!");

      setSelectedMedicines([]);

      getMedicines();
    } catch (error) {
      console.log("Delete Selected Error:", error);
      toast.error("Failed to delete selected medicines");
    }
  };

  // =========================
  // SET SINGLE REMINDER
  // =========================
  const handleSetReminder = async (medicine) => {
    try {
      // -------------------------
      // 1. CALL BACKEND API
      // -------------------------
      const response = await axios.put(
        "https://medicine-reminder-w53k.onrender.com/api/medicines/set-reminder",
        {
          medicineId: medicine._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Set Reminder API:", response.data);

      // -------------------------
      // 2. BROWSER NOTIFICATION
      // -------------------------
      if (!("Notification" in window)) {
        toast.error("Browser notification supported nahi hai");
        return;
      }

      let permission = Notification.permission;

      if (permission === "default") {
        permission = await Notification.requestPermission();
      }

      if (permission !== "granted") {
        toast.error("Notification permission allow karo");
        return;
      }

      // -------------------------
      // 3. CALCULATE REMINDER TIME
      // -------------------------
      const now = new Date();

      const [hours, minutes] = medicine.time.split(":");

      const reminderTime = new Date();

      reminderTime.setHours(
        Number(hours),
        Number(minutes),
        0,
        0
      );

      // Agar aaj ka time nikal chuka hai
      // to kal reminder hoga
      if (reminderTime <= now) {
        reminderTime.setDate(
          reminderTime.getDate() + 1
        );
      }

      const delay =
        reminderTime.getTime() - now.getTime();

      // -------------------------
      // 4. BROWSER TIMER
      // -------------------------
      const timer = setTimeout(() => {
        new Notification("💊 Medicine Reminder", {
          body: `Time to take ${medicine.name} - ${medicine.dose}`,
        });

        setReminders((prev) => {
          const updated = { ...prev };

          delete updated[medicine._id];

          return updated;
        });
      }, delay);

      // -------------------------
      // 5. SAVE TIMER
      // -------------------------
      setReminders((prev) => ({
        ...prev,
        [medicine._id]: timer,
      }));

      toast.success(
        `SMS sent & reminder set for ${medicine.name} at ${medicine.time}`
      );

      // Database se latest data fetch
      getMedicines();

    } catch (error) {
      console.error(
        "Set Reminder Error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to set reminder"
      );
    }
  };

  // =========================
  // SET MULTIPLE REMINDERS
  // =========================
  const handleSetMultipleReminders = async () => {
    if (selectedMedicines.length === 0) {
      toast.warning("Please select at least one medicine");
      return;
    }

    if (!("Notification" in window)) {
      toast.error("Browser notification supported nahi hai");
      return;
    }

    let permission = Notification.permission;

    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      toast.error("Notification permission allow karo");
      return;
    }

    const selectedMedicineList = user.medicines.filter(
      (medicine) =>
        selectedMedicines.includes(medicine._id)
    );

    try {
      // -------------------------
      // CALL API FOR EVERY MEDICINE
      // -------------------------
      await Promise.all(
        selectedMedicineList.map((medicine) =>
          axios.put(
            "https://medicine-reminder-w53k.onrender.com/api/medicines/set-reminder",
            {
              medicineId: medicine._id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      // -------------------------
      // SET BROWSER REMINDERS
      // -------------------------
      selectedMedicineList.forEach((medicine) => {
        if (reminders[medicine._id]) {
          return;
        }

        const now = new Date();

        const [hours, minutes] =
          medicine.time.split(":");

        const reminderTime = new Date();

        reminderTime.setHours(
          Number(hours),
          Number(minutes),
          0,
          0
        );

        if (reminderTime <= now) {
          reminderTime.setDate(
            reminderTime.getDate() + 1
          );
        }

        const delay =
          reminderTime.getTime() - now.getTime();

        const timer = setTimeout(() => {
          new Notification("💊 Medicine Reminder", {
            body: `Time to take ${medicine.name} - ${medicine.dose}`,
          });

          setReminders((prev) => {
            const updated = { ...prev };

            delete updated[medicine._id];

            return updated;
          });
        }, delay);

        setReminders((prev) => ({
          ...prev,
          [medicine._id]: timer,
        }));
      });

      toast.success(
        `SMS sent & ${selectedMedicineList.length} reminder(s) set`
      );

      setSelectedMedicines([]);

      getMedicines();

    } catch (error) {
      console.error(
        "Multiple Reminder Error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to set reminders"
      );
    }
  };

  // =========================
  // UPDATE SINGLE
  // =========================
  const handleUpdate = (id) => {
    navigate(`/update-medicine/${id}`);
  };

  // =========================
  // UPDATE MULTIPLE
  // =========================
  const handleMultipleUpdate = () => {
    if (selectedMedicines.length === 0) {
      toast.warning("Please select at least one medicine");
      return;
    }

    navigate("/update-medicines", {
      state: {
        ids: selectedMedicines,
      },
    });
  };

  return (
    <div className="w-full">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-2xl font-bold text-gray-800">
          💊 Medicine List
        </h2>

        {selectedMedicines.length > 0 && (
          <div className="flex gap-2">

            {/* UPDATE SELECTED */}
            <button
              type="button"
              onClick={handleMultipleUpdate}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
            >
              ✏ Update Selected (
              {selectedMedicines.length}
              )
            </button>

            {/* REMINDER */}
            <button
              type="button"
              onClick={handleSetMultipleReminders}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            >
              🔔 Set Reminder (
              {selectedMedicines.length}
              )
            </button>

            {/* DELETE */}
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              🗑 Delete Selected (
              {selectedMedicines.length}
              )
            </button>

          </div>
        )}
      </div>

      {/* =========================
          DESKTOP TABLE
      ========================= */}
      <div className="hidden md:block max-h-[400px] overflow-y-auto border rounded-lg">

        <table className="w-full border-collapse">

          <thead className="bg-blue-600 text-white sticky top-0 z-10">
            <tr>

              <th className="p-3 text-center w-12">
                <input
                  type="checkbox"
                  checked={
                    user.medicines.length > 0 &&
                    selectedMedicines.length ===
                      user.medicines.length
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                />
              </th>

              <th className="p-3 text-left">
                Medicine
              </th>

              <th className="p-3 text-left">
                Dose
              </th>

              <th className="p-3 text-left">
                Time
              </th>

              <th className="p-3 text-center">
                Reminder
              </th>

              <th className="p-3 text-center">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {user.medicines.length > 0 ? (

              user.medicines.map((medicine) => (

                <tr
                  key={medicine._id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* CHECKBOX */}
                  <td className="p-3 text-center">

                    <input
                      type="checkbox"
                      checked={selectedMedicines.includes(
                        medicine._id
                      )}
                      onChange={() =>
                        handleSelect(medicine._id)
                      }
                      className="w-4 h-4 cursor-pointer"
                    />

                  </td>

                  {/* MEDICINE */}
                  <td className="p-3">
                    {medicine.name}
                  </td>

                  {/* DOSE */}
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {medicine.dose}
                    </span>
                  </td>

                  {/* TIME */}
                  <td className="p-3">
                    {medicine.time}
                  </td>

                  {/* REMINDER STATUS */}
                  <td className="p-3 text-center">
                    {medicine.reminderEnabled ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        ON
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        OFF
                      </span>
                    )}
                  </td>

                  {/* ACTION */}
                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      {/* REMINDER */}
                      <button
                        type="button"
                        onClick={() =>
                          handleSetReminder(medicine)
                        }
                        disabled={
                          medicine.reminderEnabled ||
                          !!reminders[medicine._id]
                        }
                        className={`px-3 py-2 rounded-lg text-white text-xs ${
                          medicine.reminderEnabled ||
                          reminders[medicine._id]
                            ? "bg-gray-400"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {medicine.reminderEnabled ||
                        reminders[medicine._id]
                          ? "🔔 Set"
                          : "🔔 Reminder"}
                      </button>

                      {/* UPDATE */}
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdate(medicine._id)
                        }
                        className="px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
                      >
                        ✏ Update
                      </button>

                      {/* DELETE */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(medicine._id)
                        }
                        className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs"
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No medicines found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* =========================
          MOBILE
      ========================= */}
      <div className="md:hidden space-y-4">

        {user.medicines.length > 0 ? (

          user.medicines.map((medicine) => (

            <div
              key={medicine._id}
              className="bg-white border rounded-xl shadow-sm p-3"
            >

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={selectedMedicines.includes(
                      medicine._id
                    )}
                    onChange={() =>
                      handleSelect(medicine._id)
                    }
                    className="w-4 h-4 cursor-pointer"
                  />

                  <h3 className="text-lg font-bold text-gray-800">
                    💊 {medicine.name}
                  </h3>

                </div>

                {medicine.reminderEnabled && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Reminder ON
                  </span>
                )}

              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">

                <div className="bg-blue-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Dose
                  </p>

                  <p className="font-semibold text-blue-700">
                    {medicine.dose}
                  </p>

                </div>

                <div className="bg-purple-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Time
                  </p>

                  <p className="font-semibold text-purple-700">
                    {medicine.time}
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-2">

                {/* REMINDER */}
                <button
                  type="button"
                  onClick={() =>
                    handleSetReminder(medicine)
                  }
                  disabled={
                    medicine.reminderEnabled ||
                    !!reminders[medicine._id]
                  }
                  className={`w-full py-2 rounded-lg text-white text-sm ${
                    medicine.reminderEnabled ||
                    reminders[medicine._id]
                      ? "bg-gray-400"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {medicine.reminderEnabled ||
                  reminders[medicine._id]
                    ? "🔔 Set"
                    : "🔔 Reminder"}
                </button>

                {/* UPDATE */}
                <button
                  type="button"
                  onClick={() =>
                    handleUpdate(medicine._id)
                  }
                  className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
                >
                  ✏ Update
                </button>

                {/* DELETE */}
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(medicine._id)
                  }
                  className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
            No medicines found.
          </div>

        )}

      </div>

    </div>
  );
}

export default MedicineTable;