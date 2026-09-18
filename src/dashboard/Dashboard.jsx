
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaPills,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import StatCard from "./StatCard";
import DashboardLayout from "./DashboardLayout";
import MedicineTable from "./MedicineTable";


function Dashboard() {
  const [medicines, setMedicines] = useState([]);

  // Get medicines from backend
  useEffect(() => {
    const getMedicines = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.log("❌ User ID not found!");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/medicines/${userId}`
        );

        const medicineData = response.data.medicines || [];

       

        setMedicines(medicineData);
      } catch (error) {
        console.log(
          "❌ Medicine fetch error:",
          error.response?.data || error.message
        );
      }
    };

    getMedicines();
  }, []);

  // Total medicines
  const totalMedicines = medicines.length;

  // Today's doses
  const todayDoses = medicines.length;

  // Taken medicines
  const takenMedicines = medicines.filter(
    (medicine) => medicine.reminderEnabled === true
  ).length;

  // Pending medicines
  const pendingMedicines = totalMedicines - takenMedicines;

  return (
    <DashboardLayout>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        <StatCard
          title="Total Medicines"
          value={totalMedicines}
          color="bg-orange-500"
          icon={<FaPills />}
        />

        <StatCard
          title="Today's Doses"
          value={todayDoses}
          color="bg-green-500"
          icon={<FaClock />}
        />

        <StatCard
          title="Taken"
          value={takenMedicines}
          color="bg-blue-500"
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="Pending"
          value={pendingMedicines}
          color="bg-red-500"
          icon={<FaExclamationCircle />}
        />

      </div>

      {/* Medicine List */}
      <div className="mt-10">
        <MedicineTable />
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;
