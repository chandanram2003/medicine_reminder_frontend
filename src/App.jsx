import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";

import Dashboard from "./dashboard/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMedicine from "./pages/AddMedicine";
import MedicineList from "./pages/MedicineList";
import Profile from "./pages/Profile";

import DashboardLayout from "./dashboard/DashboardLayout";
import UpdateMedicine from "./dashboard/UpdateMedicine";
import About from "./pages/About";

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/add-medicine" element={<AddMedicine />} />

      <Route path="/medicines" element={<MedicineList />} />

      <Route path="/update-medicines" element={<UpdateMedicine />} />

      <Route path="/update-medicine/:id" element={<UpdateMedicine />} />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}

export default App;