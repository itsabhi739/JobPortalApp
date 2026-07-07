import React from "react";
import {
  FaBriefcase,
  FaCheckCircle,
  FaUsers,
  FaUserCheck,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Jobs",
    value: 12,
    change: "+2 this month",
    icon: <FaBriefcase />,
    bg: "bg-blue-100",
    text: "text-[#2F368C]",
  },
  {
    title: "Active Jobs",
    value: 8,
    change: "2 expiring soon",
    icon: <FaCheckCircle />,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    title: "Applications",
    value: 128,
    change: "+18 this week",
    icon: <FaUsers />,
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    title: "Shortlisted",
    value: 24,
    change: "+6 this week",
    icon: <FaUserCheck />,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-gray-100"
        >
          <div className="flex justify-between items-center gap-3">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">
                {stat.title}
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {stat.value}
              </h2>

              <p className="text-green-600 text-sm mt-1">
                {stat.change}
              </p>
            </div>

            <div
              className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.text} flex items-center justify-center text-xl`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;