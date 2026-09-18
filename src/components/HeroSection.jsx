
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const handleAddMedicine = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/add-medicine");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-indigo-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="min-h-[80vh] flex flex-col-reverse md:flex-row items-center justify-between gap-12">

          {/* Left Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">

            {/* Small Heading */}
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4">
              Smart Medication Management
            </p>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Never Miss Your
              <span className="text-blue-600"> Medicine </span>
              Again
            </h1>

            {/* Description */}
            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              Easily manage your medicines, set timely reminders, and track
              your medication history — all in one simple and secure place.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              {/* Add Medicine */}
              <button
                onClick={handleAddMedicine}
                className="bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold
                hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
              >
                Add Medicine
              </button>

              {/* Learn More */}
              <button
                onClick={() => navigate("/about")}
                className="border-2 border-blue-600 text-blue-600 px-7 py-3 rounded-lg
                font-semibold hover:bg-blue-600 hover:text-white
                transition-all duration-300"
              >
                Explore How It Works →
              </button>

            </div>

            {/* Trust Text */}
            <div className="mt-8 flex flex-wrap gap-6 justify-center md:justify-start text-sm text-gray-500">

              <span className="flex items-center gap-2">
                ✓ Easy to Use
              </span>

              <span className="flex items-center gap-2">
                ✓ Timely Reminders
              </span>

              <span className="flex items-center gap-2">
                ✓ Secure
              </span>

            </div>

          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center pt-10 md:pt-0">

            <div className="relative">

              {/* Background Decoration */}
              <div className="absolute -inset-4 bg-blue-200 rounded-3xl blur-2xl opacity-40"></div>

              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800"
                alt="Medicine management"
                className="relative w-full max-w-md rounded-2xl shadow-2xl
                hover:scale-105 transition-transform duration-500"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;