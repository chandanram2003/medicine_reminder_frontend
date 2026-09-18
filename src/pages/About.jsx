
function About() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="max-w-3xl mx-auto text-center">

            <p className="text-blue-200 font-semibold uppercase tracking-wider text-sm mb-4">
              About Our Application
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Smart Medicine Reminder
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              A simple and reliable web application designed to help users
              manage their medicines, receive timely reminders, and keep
              track of their medication history.
            </p>

          </div>

        </div>
      </section>


      {/* About Project */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Content */}
            <div>

              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">
                Our Purpose
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Making Medicine Management Easier
              </h2>

              <p className="text-gray-600 leading-relaxed mb-5">
                Managing medicines on a daily basis can become difficult,
                especially when people have multiple medicines or different
                medication schedules.
              </p>

              <p className="text-gray-600 leading-relaxed mb-5">
                Smart Medicine Reminder provides a convenient platform where
                users can store their medicine details, set reminder times,
                receive notifications, and monitor their medication history
                from one place.
              </p>

              <p className="text-gray-600 leading-relaxed">
                The goal of this application is to make medication management
                simple, organized, and easier to follow in everyday life.
              </p>

            </div>

            {/* Highlight Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg">

              <div className="text-5xl mb-5">
                💊
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                One Place for Your Medicines
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Manage your medicine information, reminder schedules and
                medication history through a clean and easy-to-use interface.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">
              What You Can Do
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need to Manage Medicines
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple features designed to make your daily medication
              management more organized and convenient.
            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Feature 1 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="w-14 h-14 flex items-center justify-center
                bg-blue-50 rounded-xl text-3xl mb-5">
                💊
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Medicine Management
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Add, update and manage medicine names, dosage and scheduled
                times from one convenient dashboard.
              </p>

            </div>


            {/* Feature 2 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="w-14 h-14 flex items-center justify-center
                bg-indigo-50 rounded-xl text-3xl mb-5">
                ⏰
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Smart Reminders
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Set reminder schedules and receive timely notifications for
                your medicines.
              </p>

            </div>


            {/* Feature 3 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="w-14 h-14 flex items-center justify-center
                bg-green-50 rounded-xl text-3xl mb-5">
                📊
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Medicine History
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Keep track of taken and missed doses with an organized
                medication history.
              </p>

            </div>


            {/* Feature 4 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="w-14 h-14 flex items-center justify-center
                bg-purple-50 rounded-xl text-3xl mb-5">
                🔐
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Secure Account
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Secure authentication helps protect your personal account
                and medicine-related information.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">
              Simple Process
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started with your medicine management in just a few simple
              steps.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className="text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center
                rounded-full bg-blue-600 text-white text-2xl font-bold mb-5">
                1
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Create Account
              </h3>

              <p className="text-gray-600">
                Register and create your secure account.
              </p>
            </div>


            <div className="text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center
                rounded-full bg-blue-600 text-white text-2xl font-bold mb-5">
                2
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Add Medicine
              </h3>

              <p className="text-gray-600">
                Enter medicine details, dosage and reminder time.
              </p>
            </div>


            <div className="text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center
                rounded-full bg-blue-600 text-white text-2xl font-bold mb-5">
                3
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Get Reminders
              </h3>

              <p className="text-gray-600">
                Receive notifications according to your schedule.
              </p>
            </div>


            <div className="text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center
                rounded-full bg-blue-600 text-white text-2xl font-bold mb-5">
                4
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Track Progress
              </h3>

              <p className="text-gray-600">
                Monitor your medication history and stay organized.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Technology */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-5xl mx-auto px-4 text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">
            Built With Modern Technology
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Technology Behind the Application
          </h2>

          <p className="text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
            The application is built using modern web technologies to provide
            a responsive, secure and user-friendly experience.
          </p>


          <div className="flex flex-wrap justify-center gap-4">

            <span className="px-5 py-3 bg-white rounded-lg shadow-sm font-semibold text-gray-700">
              React.js
            </span>

            <span className="px-5 py-3 bg-white rounded-lg shadow-sm font-semibold text-gray-700">
              Node.js
            </span>

            <span className="px-5 py-3 bg-white rounded-lg shadow-sm font-semibold text-gray-700">
              Express.js
            </span>

            <span className="px-5 py-3 bg-white rounded-lg shadow-sm font-semibold text-gray-700">
              MongoDB
            </span>

            <span className="px-5 py-3 bg-white rounded-lg shadow-sm font-semibold text-gray-700">
              JWT Authentication
            </span>

            <span className="px-5 py-3 bg-white rounded-lg shadow-sm font-semibold text-gray-700">
              Tailwind CSS
            </span>

          </div>

        </div>

      </section>


      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">

        <div className="max-w-4xl mx-auto px-4 text-center text-white">

          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Take Control of Your Medication Routine
          </h2>

          <p className="text-blue-100 text-lg leading-relaxed">
            Keep your medicine schedules organized, stay aware of your doses,
            and make medication management a simpler part of your daily routine.
          </p>

        </div>

      </section>

    </div>
  );
}

export default About;