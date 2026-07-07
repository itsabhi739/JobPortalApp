import React from "react";
import { FaStar } from "react-icons/fa";

const applicants = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "React Developer",
    experience: "3 Years",
    score: "98%",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Java Developer",
    experience: "2 Years",
    score: "96%",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Ankit Verma",
    role: "Node.js Developer",
    experience: "4 Years",
    score: "94%",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 4,
    name: "Neha Patel",
    role: "UI/UX Designer",
    experience: "2 Years",
    score: "92%",
    image: "https://i.pravatar.cc/150?img=25",
  },
];

const TopApplicants = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Top Applicants
          </h2>

          <p className="text-gray-500 text-sm">
            Best candidates for your jobs
          </p>
        </div>

        <button className="text-[#2F368C] font-semibold hover:underline text-sm">
          View All
        </button>
      </div>

      <div className="space-y-3">

        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-2xl transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={applicant.image}
                alt={applicant.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>

                <h3 className="font-semibold text-gray-800">
                  {applicant.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {applicant.role}
                </p>

                <p className="text-xs text-gray-400">
                  {applicant.experience}
                </p>

              </div>

            </div>

            <div className="text-right">

              <div className="flex items-center gap-1 justify-end text-yellow-500">

                <FaStar />

                <span className="font-semibold">
                  {applicant.score}
                </span>

              </div>

              <button className="mt-2 text-sm bg-[#2F368C] hover:bg-[#434EC1] text-white px-3 py-1.5 rounded-lg">
                View
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default TopApplicants;