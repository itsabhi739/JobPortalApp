import React from "react";
import {
  FaBell,
  FaUserPlus,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    icon: <FaUserPlus />,
    title: "5 New Applications",
    description: "React Developer received 5 new applications.",
    time: "5 min ago",
    color: "bg-blue-100 text-[#2F368C]",
  },
  {
    id: 2,
    icon: <FaBriefcase />,
    title: "Job Expiring Soon",
    description: "Java Developer closes tomorrow.",
    time: "2 hours ago",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 3,
    icon: <FaCheckCircle />,
    title: "Candidate Shortlisted",
    description: "Rahul Sharma shortlisted successfully.",
    time: "Yesterday",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    icon: <FaBell />,
    title: "Interview Scheduled",
    description: "Interview with Priya Singh at 3 PM.",
    time: "Yesterday",
    color: "bg-purple-100 text-purple-700",
  },
];

const Notifications = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">
            Notifications
          </h2>

          <p className="text-gray-500 text-sm">
            Latest recruiter updates
          </p>
        </div>
      </div>

      <div className="space-y-3">

        {notifications.map((item) => (

          <div
            key={item.id}
            className="flex gap-3 items-start hover:bg-gray-50 p-2 rounded-2xl transition"
          >
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-sm">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {item.description}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {item.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Notifications;