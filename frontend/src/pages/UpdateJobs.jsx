import React, { useContext, useEffect, useState } from "react";
import { Briefcase, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { JobsContext } from "../context/JobsContext";
import { AuthContext } from "../context/AuthContext";
import { CompanyContext } from "../context/CompanyContext";

const UpdateJobs = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {jobs,locations,jobTypes,updateJob} = useContext(JobsContext)
  const {userData} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    position: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    experience: "",
    requirements: "",
    status: "Active",
  });

  // Find job using URL ID
  const job = jobs.find((job) => job._id === id);

  // Pre-fill form when job is available
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        position: job.position || "",
        description: job.description || "",
        location: job.location || "",
        jobType: job.jobType || "",
        salary: job.salary || "",
        experience: job.experience || "",

        // Array -> comma separated string for input
        requirements: Array.isArray(job.requirements)? job.requirements.join(", "): job.requirements || "",
        status: job.status || "Active",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateJob(formData,id);
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">
          Loading job details...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">

      {/* Hero Section */}

      <section className="relative bg-linear-to-br from-[#1E246D] via-[#2F368C] to-[#5365E8] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 py-14 flex justify-between items-center">

          <div>
            <p className="text-indigo-200 text-lg">
              Recruiter Portal
            </p>

            <h1 className="text-5xl font-bold text-white mt-2">
              Update Job
            </h1>

            <p className="text-indigo-100 mt-5 max-w-xl text-lg">
              Update your job details and keep the opportunity
              information up to date.
            </p>

            <div className="flex gap-4 mt-8">

              <button
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
              >
                <Pencil size={20} />
                Update Job
              </button>

              <button
                className="border border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-700 transition"
                onClick={() => navigate("/jobs")}
              >
                View Jobs
              </button>

            </div>
          </div>

          {/* Job Summary */}

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-72">

            <h2 className="text-white text-xl font-semibold mb-5">
              Job Summary
            </h2>

            <div className="space-y-4 text-indigo-100">

              <div className="flex justify-between gap-4">
                <span>Company</span>
                <span className="text-right">
                  {job.company?.name || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Location</span>
                <span>{formData.location || "N/A"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Job Type</span>
                <span>{formData.jobType || "N/A"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Status</span>
                <span>{formData.status}</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Form */}

      <div className="max-w-6xl mx-auto -mt-12 relative z-10">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-indigo-100 p-3 rounded-xl">
              <Briefcase className="text-indigo-700" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Job Details
              </h2>

              <p className="text-gray-500">
                Update the information below.
              </p>
            </div>

          </div>

          <form
            className="space-y-10"
            onSubmit={handleSubmit}
          >

            {/* Basic Information */}

            <div>

              <h3 className="border-l-4 border-indigo-600 pl-3 text-xl font-semibold mb-6">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Job Title"
                  className="border rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Position"
                  className="border rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

              </div>

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Job Description..."
                className="border rounded-xl p-4 w-full mt-6 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            {/* Job Details */}

            <div>

              <h3 className="border-l-4 border-indigo-600 pl-3 text-xl font-semibold mb-6">
                Job Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border rounded-xl p-4"
                >
                  <option value="">
                    Select Location
                  </option>

                  {locations.map((location) => (
                    <option
                      key={location}
                      value={location}
                    >
                      {location}
                    </option>
                  ))}

                </select>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="border rounded-xl p-4"
                >
                  <option value="">
                    Select Job Type
                  </option>

                  {jobTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ))}

                </select>

                <input
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Salary (10-14 LPA)"
                  className="border rounded-xl p-4"
                />

                <input
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Experience (Years)"
                  className="border rounded-xl p-4"
                />

              </div>

            </div>

            {/* Requirements */}

            <div>

              <h3 className="border-l-4 border-indigo-600 pl-3 text-xl font-semibold mb-6">
                Skills Required
              </h3>

              <input
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, JWT"
                className="border rounded-xl p-4 w-full"
              />

            </div>

            {/* Job Status */}

            <div>

              <h3 className="border-l-4 border-indigo-600 pl-3 text-xl font-semibold mb-6">
                Job Status
              </h3>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border rounded-xl p-4 w-full md:w-1/2"
              >
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Closed">Closed</option>
              </select>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 pt-4">

              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="border border-indigo-600 text-indigo-700 px-8 py-3 rounded-xl hover:bg-indigo-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-10 py-3 rounded-xl font-semibold"
              >
                Update Job
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default UpdateJobs;