import { Search } from "lucide-react";
import { useContext, useState } from "react";
import { JobsContext } from "../context/JobsContext.jsx";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Jobs = () => {
  //calling hooks
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("");

  const navigate = useNavigate();
  const {
    fetchJobs,
    jobs,
    setJobs,
    keyword,
    setKeyword,
    location,
    setLocation,
  } = useContext(JobsContext);

  const { getUserData, userData } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(()=>{
      fetchJobs();
      getUserData();
    },500)
    return ()=> clearTimeout(timer);
  },[keyword,location]);

  //custom data
  const isStudent = userData?.role === "Student";
  const jobTypes = ["All", ...new Set(jobs.map((job) => job.jobType))];

  const filteredJobs = jobs.filter((job) => {
    // Job Type Filter
    const jobTypeMatch =
      selectedJobType === "All" ||
      job.jobType === selectedJobType;

    // Location Filter
    const locationMatch =
      !selectedLocation ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    // Experience Filter
    let experienceMatch = true;

    if (selectedExperience === "Fresher") {
      experienceMatch = job.experience === "Fresher";
    } else if (selectedExperience === "1-3") {
      experienceMatch = ["1", "2", "3"].includes(job.experience);
    } else if (selectedExperience === "3+") {
      experienceMatch =
        job.experience !== "Fresher" &&
        Number(job.experience) >= 3;
    }

    return jobTypeMatch && locationMatch && experienceMatch;
  });


  return (
    // <div className="mt-32">
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* Hero */}
      <section className="bg-[#2F368C] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            Find Your Dream Job
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            Explore thousands of opportunities from top companies.
          </p>

          {/* Search */}
          <div className="bg-white rounded-2xl p-4 mt-8 flex flex-col md:flex-row gap-4">
            <input
              name="keyword"
              type="text"
              placeholder="Job title, keyword..."
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 outline-none text-black px-4"
            />

            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={(e)=>setLocation(e.target.value)}
              className="flex-1 outline-none text-black px-4"
            />

            <button className="bg-[#F4BC19] text-black px-8 py-3 rounded-xl font-semibold flex items-center gap-2 justify-center">
              <Search size={18} />
              Search
            </button>

          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Filters */}
          <div className="bg-white p-6 rounded-2xl shadow h-fit">

            <h2 className="font-bold text-xl mb-6">
              Filters
              </h2>

            <div className="space-y-5">
              <div>
                <label className="font-medium block mb-2">Job Type</label>
                <select
                  className="w-full border rounded-lg p-3"
                  value={selectedJobType}
                  onChange={(e) =>setSelectedJobType(e.target.value)}
                >
                  {jobTypes.map((jobtype)=>(
                    <option key={jobtype} value={jobtype}>{jobtype}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium block mb-2">Experience</label>

                <select
                  className="w-full border rounded-lg p-3"
                  onChange={(e) => setSelectedExperience(e.target.value)}
                >
                  <option value={"All"}>All</option>
                  <option value={"Fresher"}>Fresher</option>
                  <option value={"1-3"}>1-3 Years</option>
                  <option value="3+">3+ Years</option>
                </select>
              </div>

              <div>
                <label className="font-medium block mb-2">Location</label>

                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e)=>setSelectedLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full border rounded-lg p-3"
                />
              </div>

            </div>

          </div>

          {/* Jobs */}
          <div className="lg:col-span-3">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Available Jobs
                </h2>

              <div className="text-gray-500 flex-col gap-2">
                250 Jobs Found
                {!isStudent && (
                  <div className="job-buttons flex items-center justify-center">
                    <button
                      className="bg-[#2F368C] hover:bg-[#434ec1] rounded-2xl m-2 py-4 px-4 gap-2 flex items-center  text-white"
                      onClick={() => navigate("/createjobs")}
                    >
                      Create Job <FaPlus className="text-shadow-white" />
                    </button>
                    <button
                      className="bg-[#2F368C] hover:bg-[#434ec1] rounded-2xl m-2 py-4 px-4 gap-2 flex items-center  text-white"
                      onClick={() => navigate("/")}
                    >
                      My Jobs
                      <MdWorkHistory
                        className="text-shadow-white"
                        size={"22px"}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
                >
                  <div className="flex flex-col md:flex-row justify-between">

                    <div>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {job.type}
                      </span>

                      <h3 className="text-2xl font-bold mt-3">{job.title}</h3>

                      <p className="text-gray-500 mt-1">{job.company?.name}</p>

                      <div className="flex gap-4 mt-4 text-gray-600">
                        <span>{job.location}</span>
                        <span>₹{job.salary}</span>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          React
                        </span>

                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          JavaScript
                        </span>

                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          Tailwind
                        </span>

                      </div>

                    </div>

                    <div className="mt-6 md:mt-0 flex flex-col gap-3">

                      <button className="bg-[#2F368C] text-white px-8 py-3 rounded-xl">
                        Apply Now
                      </button>

                      <button className="border border-[#2F368C] text-[#2F368C] px-8 py-3 rounded-xl">
                        View Details
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>
    </div>
    // </div>

  );
};

export default Jobs;