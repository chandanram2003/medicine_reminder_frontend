import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddMedicine() {
  const [medicines, setMedicines] = useState([
    {
      name: "",
      dose: "",
      time: "",
      hour: "",
      minute: "",
      period: "AM",
    },
  ]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Add new medicine row
  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dose: "",
        time: "",
        hour: "",
        minute: "",
        period: "AM",
      },
    ]);
  };

  // Remove medicine row
  const removeMedicine = (index) => {
    if (medicines.length === 1) return;

    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  // Convert 12-hour time to 24-hour time
  const convertTo24Hour = (hour, minute, period) => {
    let hours = Number(hour);

    if (period === "AM") {
      if (hours === 12) {
        hours = 0;
      }
    } else {
      if (hours !== 12) {
        hours = hours + 12;
      }
    }

    return `${String(hours).padStart(2, "0")}:${minute}`;
  };

  // Handle input
  const handleChange = (index, field, value) => {
    const updated = [...medicines];

    updated[index][field] = value;

    // Time fields change hone par 24-hour time create karo
    if (
      field === "hour" ||
      field === "minute" ||
      field === "period"
    ) {
      const current = updated[index];

      if (current.hour && current.minute) {
        updated[index].time = convertTo24Hour(
          current.hour,
          current.minute,
          current.period
        );
      }
    }

    setMedicines(updated);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate time
    for (const medicine of medicines) {
      if (!medicine.hour || !medicine.minute || !medicine.period) {
        toast.error("Please select reminder time for all medicines");
        return;
      }
    }

    // Sirf backend ke required fields bhejo
    const data = {
      medicines: medicines.map((medicine) => ({
        name: medicine.name,
        dose: medicine.dose,
        time: medicine.time,
      })),
    };

    console.log("Sending data to backend:", data);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/medicines/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Medicines added successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(
        "Error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to add medicines"
      );
    }
  };

  // Hour options: 1-12
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  // Minute options: 00-59
  const minutes = Array.from(
    { length: 60 },
    (_, i) => String(i).padStart(2, "0")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-3 py-6">

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-6">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="text-center mb-6">

          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💊</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Add Medicine
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add multiple medicines at once
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              {/* Table Header */}
              <thead>
                <tr className="bg-blue-50 border-b">

                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                    Medicine
                  </th>

                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                    Medicine Name
                  </th>

                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                    Dose
                  </th>

                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                    Reminder Time
                  </th>

                  <th className="px-4 py-3"></th>

                </tr>
              </thead>

              {/* Table Body */}
              <tbody>

                {medicines.map((medicine, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >

                    {/* Medicine Number */}
                    <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">
                      Medicine {index + 1}
                    </td>

                    {/* Medicine Name */}
                    <td className="px-4 py-3">

                      <input
                        type="text"
                        value={medicine.name}
                        placeholder="Enter medicine name"
                        onChange={(e) =>
                          handleChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className="w-full min-w-[180px] px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />

                    </td>

                    {/* Dose */}
                    <td className="px-4 py-3">

                      <input
                        type="text"
                        value={medicine.dose}
                        placeholder="e.g. 500mg"
                        onChange={(e) =>
                          handleChange(
                            index,
                            "dose",
                            e.target.value
                          )
                        }
                        className="w-full min-w-[130px] px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />

                    </td>

                    {/* Reminder Time */}
                    <td className="px-4 py-3">

                      <div className="flex items-center gap-2 min-w-[260px]">

                        {/* Hour */}
                        <select
                          value={medicine.hour}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "hour",
                              e.target.value
                            )
                          }
                          className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">
                            Hour
                          </option>

                          {hours.map((hour) => (
                            <option
                              key={hour}
                              value={String(hour).padStart(2, "0")}
                            >
                              {String(hour).padStart(2, "0")}
                            </option>
                          ))}
                        </select>

                        <span className="font-bold text-gray-500">
                          :
                        </span>

                        {/* Minute */}
                        <select
                          value={medicine.minute}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "minute",
                              e.target.value
                            )
                          }
                          className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">
                            Min
                          </option>

                          {minutes.map((minute) => (
                            <option
                              key={minute}
                              value={minute}
                            >
                              {minute}
                            </option>
                          ))}
                        </select>

                        {/* AM / PM */}
                        <select
                          value={medicine.period}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "period",
                              e.target.value
                            )
                          }
                          className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>

                      </div>

                      {/* Debug / Preview */}
                      {medicine.time && (
                        <p className="text-xs text-gray-500 mt-2">
                          Saved time:{" "}
                          <span className="font-semibold text-blue-600">
                            {medicine.time}
                          </span>
                        </p>
                      )}

                    </td>

                    {/* Remove */}
                    <td className="px-4 py-3">

                      {medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeMedicine(index)
                          }
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                          Remove
                        </button>
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Add Medicine Button */}
          <div className="mt-5">

            <button
              type="button"
              onClick={addMedicine}
              className="border border-blue-600 text-blue-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              + Add Medicine
            </button>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add All Medicines
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddMedicine;