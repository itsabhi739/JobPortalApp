import React from "react";
import { FaBriefcase, FaPlus, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Welcome = ({user, jobs = [], applications = [], isStudent = false}) => {
  const navigate = useNavigate();
  const today = new Date();
  const isToday = (date) => {
    const value = new Date(date);
    return value.toDateString() === today.toDateString();
  };
  const newApplications = applications.filter((application) => isToday(application.createdAt)).length;
  const activeJobs = jobs.filter((job) => job.status === "Active").length;
  const shortlisted = applications.filter((application) => application.status === "shortlisted").length;

  return (
    <div className="bg-linear-to-r from-[#6055FF] to-[#434EC1] rounded-3xl p-4 lg:p-5 text-white shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
        <div>
          <p className="text-sm text-gray-200">
            {isStudent ? "Student Dashboard" : "Recruiter Dashboard"}
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Welcome Back {user?.username}
          </h1>

          <p className="mt-3 text-gray-200 max-w-xl leading-6 text-sm">
            {isStudent ? "Track your applications, discover opportunities and keep your job search moving forward." : "Manage your job postings, monitor applications, shortlist candidates and hire the best talent—all from one place."}
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => navigate(isStudent ? "/jobs" : "/createjobs")}
              className="bg-[#F4BC19] text-black font-semibold px-4 py-2.5 rounded-xl hover:scale-105 transition flex items-center gap-2 text-sm"
            >
              {isStudent ? <FaBriefcase /> : <FaPlus />}
              {isStudent ? "Apply Job" : "Create Job"}
            </button>

            <button
              onClick={() => navigate(isStudent ? "/my-applications" : "/jobs")}
              className="border border-white px-4 py-2.5 rounded-xl hover:bg-white hover:text-[#6055FF] transition flex items-center gap-2 text-sm"
            >
              {isStudent ? <FaFileAlt /> : <FaBriefcase />}
              {isStudent ? "View Applications" : "View Jobs"}
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 w-full lg:w-72">
          <h3 className="font-semibold text-base">
            Today's Summary
          </h3>

          <div className="space-y-3 mt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-200">{isStudent ? "Applications Today" : "New Applications"}</span>
              <span className="font-bold">{isStudent ? newApplications : 12}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200">{isStudent ? "Active Jobs Available" : "Active Jobs"}</span>
              <span className="font-bold">{isStudent ? activeJobs : 8}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200">{isStudent ? "Total Applications" : "Interviews Today"}</span>
              <span className="font-bold">{isStudent ? applications.length : 3}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200">Shortlisted</span>
              <span className="font-bold">{isStudent ? shortlisted : 24}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;