import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaEdit,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { name, mob, age, email } = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Heading */}
      <div className="mb-5">
        {/* Back Arrow */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-3 text-gray-600 hover:text-blue-600 text-xl transition"
          title="Back to Dashboard"
        >
          ←
        </button>

        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

        <p className="text-sm text-gray-500 mt-1">
          View and manage your account information
        </p>
      </div>

      {/* Profile Box */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Top Blue Section */}
        <div className="bg-blue-600 h-24"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar + Edit */}
          <div className="-mt-12 mb-5 flex items-end justify-between">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                <FaUser className="text-blue-600 text-4xl" />
              </div>
            </div>

            {/* Edit Profile */}
            <button
              type="button"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              <FaEdit />
              Edit Profile
            </button>
          </div>

          {/* Name */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Chandan</h2>

            <p className="text-sm text-gray-500">Medicine App User</p>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaUser className="text-blue-600 text-sm" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Full Name</p>

                  <p className="text-sm font-semibold text-gray-800">{name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaEnvelope className="text-blue-600 text-sm" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Email</p>

                  <p className="text-sm font-semibold text-gray-800 break-all">
                    {email}
                  </p>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                  <FaPhone className="text-green-600 text-sm" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Mobile</p>

                  <p className="text-sm font-semibold text-gray-800">{mob}</p>
                </div>
              </div>

              {/* Age */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FaBirthdayCake className="text-purple-600 text-sm" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Age</p>

                  <p className="text-sm font-semibold text-gray-800">{age}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="mt-6 pt-5 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Account Status
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Your account is currently active.
                </p>
              </div>

              <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                ● Active
              </span>
            </div>
          </div>

          {/* Password & Security */}
          <div className="mt-6 pt-5 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Password & Security
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Change your password to keep your account secure.
                </p>
              </div>

              <button
                type="button"
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                🔒 Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
