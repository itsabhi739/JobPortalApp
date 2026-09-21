import React from "react";
import { Briefcase, FileText } from "lucide-react";
import Loader from "./Loader";

const assetUrl = (asset) => asset?.startsWith("http") ? asset : asset ? `${import.meta.env.VITE_BACKEND_URL}${asset}` : "";

const AppliedJobs = ({ applications = [], onSeeMore, recruiterView = false, onStatusChange, onApplicantClick, loading = false }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">{recruiterView ? "Applicants" : "Applied Jobs"}</h2>
          <p className="text-gray-500 text-sm">{recruiterView ? "Review applications for your jobs" : "Fresh applications for today"}</p>
        </div>

        {onSeeMore && (
          <button
            type="button"
            onClick={onSeeMore}
            className="text-sm font-medium text-[#6055FF] hover:underline"
          >
            See more
          </button>
        )}
      </div>

      <div className="space-y-3">
        {loading ? <Loader className="py-6" /> : applications.length === 0 ? (
          <div className="text-sm text-gray-500 py-4">No jobs applied yet.</div>
        ) : (
          applications.map((application) => (
            <div key={application._id} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-2xl transition">
              <div className="flex items-center gap-3">
                  {recruiterView && application.applicant?.profile?.profilePhoto ? <img src={assetUrl(application.applicant.profile.profilePhoto)} alt="Applicant" className="h-10 w-10 rounded-xl object-cover" /> : <div className="h-10 w-10 rounded-xl bg-blue-100 text-[#6055FF] flex items-center justify-center"><Briefcase size={18} /></div>}
                  <div>
                    <h3 className="font-semibold text-sm">{recruiterView ? <button type="button" className="text-left hover:text-[#6055FF]" onClick={() => onApplicantClick?.(application.applicant?._id)}>{application.applicant?.username || "Student"}</button> : application.job?.title || "Job Title"}</h3>
                    <p className="text-xs text-gray-500">{recruiterView ? application.job?.title || "Job" : application.job?.company?.name || "Company"}</p>
                  </div>
                </div>

              <div className="text-right">{recruiterView ? <select value={application.status || "pending"} onChange={(event) => onStatusChange(application._id, event.target.value)} className="text-xs border border-slate-300 rounded-lg px-2 py-1"><option value="pending">Pending</option><option value="shortlisted">Shortlisted</option><option value="accepted">Accepted</option><option value="rejected">Rejected</option></select> : <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{application.status || "pending"}</span>}<p className="text-xs text-gray-400 mt-2">{recruiterView ? application.applicant?.email : "Applied"} {new Date(application.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}</p>{recruiterView && application.applicant?.profile?.resume && <a href={assetUrl(application.applicant.profile.resume)} target="_blank" rel="noreferrer" className="text-[#6055FF] flex items-center gap-1 justify-end mt-1"><FileText size={14} /> Resume</a>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;