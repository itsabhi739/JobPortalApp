import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Popup from "./Popup";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "React Developer",
    applications: 25,
    status: "Active",
    posted: "2 Jul 2026",
  },
  {
    id: 2,
    title: "Java Developer",
    applications: 18,
    status: "Active",
    posted: "30 Jun 2026",
  },
  {
    id: 3,
    title: "Node.js Developer",
    applications: 42,
    status: "Closed",
    posted: "25 Jun 2026",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    applications: 12,
    status: "Paused",
    posted: "20 Jun 2026",
  },
];

const statusColor = {
  Active: "bg-green-100 text-green-700",
  Closed: "bg-red-100 text-red-600",
  Paused: "bg-yellow-100 text-yellow-700",
};

const RecentJobs = ({ userData, userJobs, loading, updateJob,deleteJob }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const navigate = useNavigate();

  const convertDate = (updatedAt) => {
    const date = new Date(updatedAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return date;
  };

  const handleDeleteClick = (jobId) => {
  setSelectedJobId(jobId);
  setShowPopup(true);
};
  const handleConfirmDelete = async () => {
    await deleteJob(selectedJobId);
    setShowPopup(false);
    setSelectedJobId(null);
  };

  return (
    <>
    
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">
            Recent Jobs
            </h2>

          <p className="text-gray-500 text-sm">
            Latest jobs posted by your company
          </p>
        </div>

        <button className="text-[#6055FF] font-semibold hover:underline text-sm">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">
          
          <thead>
            <tr className="text-left border-b">
              
              <th className="pb-3">Job</th>
              <th className="pb-3">Location</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Posted</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-sm text-gray-500">
                  <Loader />
                </td>
              </tr>
            ) : userJobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-sm text-gray-500">
                  No jobs found for this recruiter.
                </td>
              </tr>
            ) : userJobs.map((job) => (
              <tr  className="border-b hover:bg-gray-50" key={job._id}>
                <td className="py-3 font-medium text-sm">
                  {job.title}
                </td>

                <td className="text-sm">{job.location}</td>
                <td>
                  <select value={job.status || "Active"} onChange={(event) => updateJob({ status: event.target.value }, job._id)} className={`px-2.5 py-1 rounded-full text-xs border-0 ${statusColor[job.status] || statusColor.Active}`}>
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>

                <td className="text-sm">{convertDate(job.updatedAt)}</td>

                <td>
                  <div className="flex gap-3 text-[#6055FF] text-sm">

                    <FaEye className="cursor-pointer hover:text-black" />

                    <FaEdit className="cursor-pointer hover:text-green-600" onClick={()=>navigate(`/update-job/${job._id}`)} />

                    <FaTrash className="cursor-pointer hover:text-red-500" onClick={()=>handleDeleteClick(job._id)}/>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
    {showPopup && (
        <Popup
          title="Delete Job?"
          message="Are you sure you want to delete this job? This action cannot be undone."
          onCancel={()=>setShowPopup(false)}
          onConfirm={()=>handleConfirmDelete()}
        />
      )}
    </>
  );
};

export default RecentJobs;