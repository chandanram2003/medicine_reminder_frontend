// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h3 className="text-gray-500">{title}</h3>

//       <p className="text-3xl font-bold mt-2">
//         {value}
//       </p>
//     </div>
//   );
// }

// export default StatCard;

import {
  FaPills,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function StatCard({ title, value, color, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 relative">
      <div
        className={`absolute -top-5 left-5 w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl shadow-lg ${color}`}
      >
        {icon}
      </div>

      <div className="pt-8 text-right">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-4xl font-bold text-gray-700">
          {value}
        </h2>
      </div>
    </div>
  );
}

export default StatCard;