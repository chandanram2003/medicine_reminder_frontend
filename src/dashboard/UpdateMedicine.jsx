import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateMedicine() {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // GET SINGLE ID FROM URL
  // Example:
  // /update-medicine/64abc123
  // =========================
  const { id } = useParams();

  const token = localStorage.getItem("token");

  // =========================
  // GET MULTIPLE IDS FROM STATE
  // Example:
  // {
  //   ids: ["id1", "id2", "id3"]
  // }
  // =========================
  const selectedIds = location.state?.ids || [];

  // =========================
  // SINGLE OR MULTIPLE
  // =========================

  const isSingleUpdate = Boolean(id);

  // Single:
  // [id]
  //
  // Multiple:
  // [id1, id2, id3]

  const updateIds = isSingleUpdate ? [id] : selectedIds;

  // =========================
  // STATES
  // =========================

  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  // =========================
  // FETCH MEDICINES
  // =========================

  useEffect(() => {
    const fetchMedicines = async () => {
      // No ID found
      if (updateIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // =========================
        // FETCH ALL SELECTED MEDICINES
        // =========================

        const responses = await Promise.all(
          updateIds.map((medicineId) =>
            axios.get(
              `http://localhost:5000/api/medicines/singleUser/${medicineId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          )
        );

        // =========================
        // FORMAT DATA
        // =========================

        const fetchedMedicines = responses.map((response) => {
          const data = response.data.medicine;

          return {
            _id: data._id,
            name: data.name || "",
            dose: data.dose || "",
            time: data.time || "",
            reminderEnabled: data.reminderEnabled ?? false,
          };
        });

        setMedicines(fetchedMedicines);

        console.log(
          "Fetched Medicines:",
          fetchedMedicines
        );
      } catch (error) {
        console.error(
          "Fetch medicines error:",
          error.response?.data || error.message
        );

        toast.error(
          error.response?.data?.message ||
            "Medicines fetch nahi ho saki"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [id, location.state]);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setMedicines((prev) =>
      prev.map((medicine, i) =>
        i === index
          ? {
              ...medicine,
              [name]: value,
            }
          : medicine
      )
    );
  };

  // =========================
  // UPDATE SINGLE / MULTIPLE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =========================
    // VALIDATION
    // =========================

    if (medicines.length === 0) {
      toast.warning("No medicine found");
      return;
    }

    // =========================
    // VALIDATE FIELDS
    // =========================

    for (const medicine of medicines) {
      if (!medicine.name.trim()) {
        toast.warning("Medicine name cannot be empty");
        return;
      }

      if (!medicine.dose.trim()) {
        toast.warning("Medicine dose cannot be empty");
        return;
      }

      if (!medicine.time) {
        toast.warning("Please select medicine time");
        return;
      }
    }

    try {
      setUpdating(true);

      console.log(
        "Updating medicines:",
        medicines
      );

      // =========================
      // UPDATE ALL
      // =========================
      //
      // Single case:
      // Promise.all([one API])
      //
      // Multiple case:
      // Promise.all([API1, API2, API3])

      const responses = await Promise.all(
        medicines.map((medicine) =>
          axios.put(
            `http://localhost:5000/api/medicines/update/${medicine._id}`,
            {
              name: medicine.name.trim(),
              dose: medicine.dose.trim(),
              time: medicine.time,
              reminderEnabled:
                medicine.reminderEnabled,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      console.log(
        "Update Responses:",
        responses
      );

      // =========================
      // SUCCESS MESSAGE
      // =========================

      if (isSingleUpdate) {
        toast.success(
          "Medicine updated successfully!"
        );
      } else {
        toast.success(
          `${medicines.length} medicines updated successfully!`
        );
      }

      // =========================
      // GO DASHBOARD
      // =========================

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error(
        "Update medicines error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Medicine update nahi ho saki"
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // NO MEDICINE SELECTED
  // =========================

  if (updateIds.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            No Medicines Selected
          </h2>

          <p className="text-gray-500 mb-5">
            Please select a medicine first.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md px-8 py-6 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>

          <p className="text-gray-600">
            Loading medicine(s)...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8">

          {/* BACK */}

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            disabled={updating}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-5"
          >
            ← Back
          </button>

          {/* TITLE */}

          <div className="text-center">

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">

              {isSingleUpdate
                ? "✏️ Update Medicine"
                : "✏️ Update Selected Medicines"}

            </h1>

            <p className="text-sm text-gray-500 mt-2">

              {isSingleUpdate
                ? "Update your medicine details"
                : `You selected ${medicines.length} medicine(s)`}

            </p>

          </div>
        </div>

        {/* =========================
            FORM
        ========================= */}

        <form onSubmit={handleSubmit}>

          <div className="space-y-6">

            {medicines.map((medicine, index) => (

              <div
                key={medicine._id}
                className="border border-gray-200 rounded-xl p-5 bg-gray-50"
              >

                {/* =========================
                    MEDICINE HEADER
                ========================= */}

                <div className="flex items-center justify-between mb-5">

                  <h2 className="text-lg font-bold text-gray-800">

                    💊 Medicine {index + 1}

                  </h2>

                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                    {isSingleUpdate
                      ? "Update"
                      : "Selected"}

                  </span>

                </div>

                {/* =========================
                    FIELDS
                ========================= */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* =========================
                      NAME
                  ========================= */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Medicine Name
                    </label>

                    <input
                      name="name"
                      type="text"
                      value={medicine.name}
                      onChange={(e) =>
                        handleChange(index, e)
                      }
                      placeholder="Enter medicine name"
                      disabled={updating}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                  </div>

                  {/* =========================
                      DOSE
                  ========================= */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dose
                    </label>

                    <input
                      name="dose"
                      type="text"
                      value={medicine.dose}
                      onChange={(e) =>
                        handleChange(index, e)
                      }
                      placeholder="Example: 500mg"
                      disabled={updating}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                  </div>

                  {/* =========================
                      TIME
                  ========================= */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Medicine Time
                    </label>

                    <input
                      name="time"
                      type="time"
                      value={medicine.time}
                      onChange={(e) =>
                        handleChange(index, e)
                      }
                      disabled={updating}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* =========================
              BUTTONS
          ========================= */}

          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            {/* BACK */}

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              disabled={updating}
              className="w-full sm:w-1/2 py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold transition disabled:opacity-50"
            >
              ← Back
            </button>

            {/* UPDATE */}

            <button
              type="submit"
              disabled={updating}
              className="w-full sm:w-1/2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
            >

              {updating
                ? "Updating..."
                : isSingleUpdate
                ? "✓ Update Medicine"
                : `✓ Update All (${medicines.length})`}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default UpdateMedicine;