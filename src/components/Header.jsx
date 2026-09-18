
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center py-4">

            {/* Logo */}
            <h1 className="text-xl md:text-2xl font-bold text-blue-600">
              Smart Medicine Reminder
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6">

                {!token ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="text-gray-700 hover:text-blue-600 transition duration-200"
                      >
                        Login
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/register"
                        className="text-gray-700 hover:text-blue-600 transition duration-200"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        className="text-blue-600 font-semibold hover:text-blue-700 transition"
                      >
                        {user?.name || "User"}
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-gray-800 text-3xl focus:outline-none"
              aria-label="Open menu"
            >
              ☰
            </button>

          </div>
        </div>
      </header>

      {/* Background Overlay */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
        ></div>
      )}

      {/* Mobile Slider */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black z-[60]
        shadow-2xl transform transition-transform duration-300 ease-in-out
        md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Slider Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">

          <h2 className="text-lg font-bold text-white">
            Menu
          </h2>

          <button
            onClick={closeMenu}
            className="text-2xl text-white hover:text-red-400 transition"
            aria-label="Close menu"
          >
            ✕
          </button>

        </div>

        {/* Mobile Navigation */}
        <nav className="p-5">

          <ul className="flex flex-col gap-5">

            {!token ? (
              <>
                {/* Login */}
                <li>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block text-white text-lg hover:text-blue-400 transition duration-200"
                  >
                    Login
                  </Link>
                </li>

                {/* Register */}
                <li>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="block text-white text-lg hover:text-blue-400 transition duration-200"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* User */}
                <li>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="block text-blue-400 font-semibold text-lg hover:text-blue-300 transition"
                  >
                    {user?.name || "User"}
                  </Link>
                </li>

                {/* Logout */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>

        </nav>

      </div>
    </>
  );
}

export default Header;