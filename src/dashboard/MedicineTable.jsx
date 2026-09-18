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
        `${import.meta.env.VITE_BASE_URL}/api/medicines/${id}`,
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
            `${import.meta.env.VITE_BASE_URL}/api/medicines/${id}`,
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
      // 1. BACKEND API
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/medicines/set-reminder`,
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

      // 2. BROWSER NOTIFICATION
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

      // 3. CALCULATE REMINDER TIME
      const now = new Date();

      const [hours, minutes] = medicine.time.split(":");

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

      // 4. BROWSER TIMER
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

      // 5. SAVE TIMER
      setReminders((prev) => ({
        ...prev,
        [medicine._id]: timer,
      }));

      toast.success(
        `SMS sent & reminder set for ${medicine.name} at ${medicine.time}`
      );

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
      // CALL API
      await Promise.all(
        selectedMedicineList.map((medicine) =>
          axios.put(
            `${import.meta.env.VITE_BASE_URL}/api/medicines/set-reminder`,
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

      // SET BROWSER REMINDERS
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
    <div className="w-full min-w-0">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col gap-3 mb-5">

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          💊 Medicine List
        </h2>

        {/* SELECTED ACTIONS */}
        {selectedMedicines.length > 0 && (
          <div className="w-full bg-gray-50 border rounded-xl p-3">

            <p className="text-sm text-gray-600 mb-2">
              {selectedMedicines.length} medicine
              {selectedMedicines.length > 1 ? "s" : ""} selected
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

              {/* UPDATE */}
              <button
                type="button"
                onClick={handleMultipleUpdate}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2.5 rounded-lg transition text-sm font-medium"
              >
                ✏ Update Selected (
                {selectedMedicines.length})
              </button>

              {/* REMINDER */}
              <button
                type="button"
                onClick={handleSetMultipleReminders}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg transition text-sm font-medium"
              >
                🔔 Set Reminder (
                {selectedMedicines.length})
              </button>

              {/* DELETE */}
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg transition text-sm font-medium"
              >
                🗑 Delete Selected (
                {selectedMedicines.length})
              </button>

            </div>
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

                  {/* REMINDER */}
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
      <div className="md:hidden space-y-4 w-full">

        {user.medicines.length > 0 ? (

          user.medicines.map((medicine) => (

            <div
              key={medicine._id}
              className={`bg-white border rounded-xl shadow-sm p-3 sm:p-4 w-full transition ${
                selectedMedicines.includes(medicine._id)
                  ? "border-blue-500 ring-1 ring-blue-200"
                  : "border-gray-200"
              }`}
            >

              {/* MEDICINE HEADER */}
              <div className="flex items-start gap-3 mb-4">

                <input
                  type="checkbox"
                  checked={selectedMedicines.includes(
                    medicine._id
                  )}
                  onChange={() =>
                    handleSelect(medicine._id)
                  }
                  className="w-5 h-5 mt-1 shrink-0 cursor-pointer accent-blue-600"
                />

                <div className="flex-1 min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="text-base sm:text-lg font-bold text-gray-800 break-words">
                      💊 {medicine.name}
                    </h3>

                    {medicine.reminderEnabled && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap">
                        Reminder ON
                      </span>
                    )}

                  </div>

                </div>

              </div>

              {/* DOSE + TIME */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">

                <div className="bg-blue-50 rounded-lg p-3 min-w-0">

                  <p className="text-xs text-gray-500 mb-1">
                    Dose
                  </p>

                  <p className="font-semibold text-blue-700 break-words">
                    {medicine.dose}
                  </p>

                </div>

                <div className="bg-purple-50 rounded-lg p-3 min-w-0">

                  <p className="text-xs text-gray-500 mb-1">
                    Time
                  </p>

                  <p className="font-semibold text-purple-700">
                    {medicine.time}
                  </p>

                </div>

              </div>

              {/* MOBILE ACTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

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
                  className={`w-full py-2.5 px-2 rounded-lg text-white text-sm font-medium ${
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
                  className="w-full py-2.5 px-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium"
                >
                  ✏ Update
                </button>

                {/* DELETE */}
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(medicine._id)
                  }
                  className="w-full py-2.5 px-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
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

