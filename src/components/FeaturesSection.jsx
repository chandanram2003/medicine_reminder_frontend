function FeaturesSection() {
  const features = [
    {
      icon: "💊",
      title: "Easy Medicine Management",
      desc: "Add, update, and manage your medicines, dosage, and schedules easily in one place.",
    },
    {
      icon: "⏰",
      title: "Timely Reminders",
      desc: "Get timely reminders for your scheduled medicines so you can stay consistent with your medication.",
    },
    {
      icon: "📊",
      title: "Dose History Tracking",
      desc: "Track your taken and missed doses with a clear and organized medicine history.",
    },
    {
      icon: "🔐",
      title: "Secure & Private",
      desc: "Your personal account and medicine information are protected with secure authentication.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Stay on Track
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Manage your medicines, receive timely reminders, and keep track
            of your medication history with ease.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-7 shadow-sm border border-gray-100 
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              {/* Icon */}
              <div
                className="w-14 h-14 flex items-center justify-center 
                rounded-xl bg-blue-50 text-3xl mb-6 
                group-hover:bg-blue-100 transition"
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

        {/* Bottom Text */}
        <div className="text-center mt-14">
          <p className="text-gray-500">
            Simple. Reliable. Designed to help you manage your medication better.
          </p>
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;