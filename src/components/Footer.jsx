function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="text-xl font-bold">
              Smart Medicine Reminder
            </h3>

            <p className="mt-3 text-gray-400">
              Helping users manage medicines
              and reminders effectively.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              Quick Links
            </h3>

            <ul className="mt-3 space-y-2 text-gray-400">
              <li>Home</li>
              <li>Add Medicine</li>
              <li>Login</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              Contact
            </h3>

            <p className="mt-3 text-gray-400">
              ck660405@gmail.com
            </p>

            <p className="text-gray-400">
              +91 8960759313
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          © 2026 Smart Medicine Reminder System
        </div>

      </div>

    </footer>
  );
}

export default Footer;