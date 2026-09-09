import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JobsContext } from "../context/JobsContext";

const MyApplications = () => {
  const { fetchMyApplications, myApplications } = useContext(JobsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchMyApplications();
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Applications</h1>
            <p className="text-gray-500 mt-1">Track every job you have applied for.</p>
          </div>
          <Link to="/jobs" className="text-[#2F368C] font-medium hover:underline">
            Back to jobs
          </Link>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-gray-500">Loading applications...</div>
        ) : myApplications.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-gray-500">
            You have not applied to any jobs yet.
          </div>
        ) : (
          <div className="space-y-4">
            {myApplications.map((application) => (
              <div key={application._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">{application.job?.title || "Job Title"}</h2>
                    <p className="text-sm text-gray-500 mt-1">{application.job?.company?.name || "Company"}</p>
                  </div>

                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {application.status || "pending"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>{application.job?.location || "Location"}</span>
                  <span>{application.job?.jobType || "Full Time"}</span>
                  <span>
                    Applied on {new Date(application.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
