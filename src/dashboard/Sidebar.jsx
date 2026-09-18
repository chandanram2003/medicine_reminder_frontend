
import {
  FaHome,
  FaPills,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate, useLocation } from "react-router-dom";
import logoutUser from "./Log.jsx";
import { toast } from "react-toastify";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();

      toast.success("Logout Successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Logout Failed!");
    }
  };

  return (
    
      <aside className="fixed top-0 left-0 w-64 h-screen bg-slate-900 text-white p-5">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <FaPills size={20} />
        </div>

        <h2 className="text-xl font-bold">
          Medicine App
        </h2>
      </div>

      {/* Menu */}
      <ul className="space-y-2">

        {/* Dashboard */}
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === "/dashboard"
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            <FaHome />
            Dashboard
          </Link>
        </li>

        {/* Medicines */}
        {/* comming soon for major projects */}
        {/* <li>
          <Link
            to="/medicines"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === "/medicines"
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            <FaPills />
            Medicines
          </Link>
        </li> */}

        {/* Add Medicine */}
        <li>
          <Link
            to="/add-medicine"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === "/add-medicine"
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            <FaPlusCircle />
            Add Medicine
          </Link>
        </li>

        {/* Profile */}
        <li>
          <Link
            to="/profile"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              location.pathname === "/profile"
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            <FaUser />
            Profile
          </Link>
        </li>

        {/* Logout */}
        <li
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 hover:bg-red-500 rounded-lg cursor-pointer transition"
        >
          <FaSignOutAlt />
          Logout
        </li>

      </ul>
    </aside>
  );
}

export default Sidebar;
