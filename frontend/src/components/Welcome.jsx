import React from "react";
import { FaBriefcase, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Welcome = ({user}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-r from-[#2F368C] to-[#434EC1] rounded-3xl p-4 lg:p-5 text-white shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
        <div>
          <p className="text-sm text-gray-200">
            Recruiter Dashboard
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Welcome Back {user?.username}
          </h1>

          <p className="mt-3 text-gray-200 max-w-xl leading-6 text-sm">
            Manage your job postings, monitor applications, shortlist
            candidates and hire the best talent—all from one place.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => navigate("/createjobs")}
              className="bg-[#F4BC19] text-black font-semibold px-4 py-2.5 rounded-xl hover:scale-105 transition flex items-center gap-2 text-sm"
            >
              <FaPlus />
              Create Job
            </button>

            <button
              onClick={() => navigate("/jobs")}
              className="border border-white px-4 py-2.5 rounded-xl hover:bg-white hover:text-[#2F368C] transition flex items-center gap-2 text-sm"
            >
              <FaBriefcase />
              View Jobs
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 w-full lg:w-72">
          <h3 className="font-semibold text-base">
            Today's Summary
          </h3>

          <div className="space-y-3 mt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-200">New Applications</span>
              <span className="font-bold">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200">Active Jobs</span>
              <span className="font-bold">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200">Interviews Today</span>
              <span className="font-bold">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200">Shortlisted</span>
              <span className="font-bold">24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;