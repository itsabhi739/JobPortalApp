import React from "react";
import { Briefcase } from "lucide-react";

const AppliedJobs = ({ applications = [], onSeeMore }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">Applied Jobs</h2>
          <p className="text-gray-500 text-sm">Fresh applications for today</p>
        </div>

        {onSeeMore && (
          <button
            type="button"
            onClick={onSeeMore}
            className="text-sm font-medium text-[#2F368C] hover:underline"
          >
            See more
          </button>
        )}
      </div>

      <div className="space-y-3">
        {applications.length === 0 ? (
          <div className="text-sm text-gray-500 py-4">No jobs applied yet.</div>
        ) : (
          applications.map((application) => (
            <div key={application._id} className="rounded-2xl border border-slate-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 text-[#2F368C] flex items-center justify-center">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{application.job?.title || "Job Title"}</h3>
                    <p className="text-xs text-gray-500">{application.job?.company?.name || "Company"}</p>
                  </div>
                </div>

                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {application.status || "pending"}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(application.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;