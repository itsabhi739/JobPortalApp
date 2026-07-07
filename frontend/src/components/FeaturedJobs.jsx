import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { JobsContext } from "../context/JobsContext";


const FeaturedJobs = () => {
  const {backendURL,inputClass} = useContext(AuthContext);
  const {fetchJobs,jobs,setJobs} = useContext(JobsContext);

  useEffect(()=>{
    fetchJobs()
  },[])

  const featuredJobs = jobs.slice(0,6);

  return (
    <section className="bg-slate-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-12">
          Featured Jobs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {featuredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <h3 className="font-bold text-xl">
                {job.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {job.company?.title}
              </p>

              <div className="flex gap-2 mt-4">
                <span className="bg-blue-100 px-3 py-1 rounded">
                  {job.requirements.slice(0,1)}
                </span>
                <span className="bg-blue-100 px-3 py-1 rounded">
                  {job.requirements.slice(1,2)}
                </span>
              

                <span className="bg-green-100 px-3 py-1 rounded">
                  {job.jobType}
                </span>
              </div>

              <button className="mt-5 bg-blue-600 text-white w-full py-2 rounded-lg">
                Apply Now
              </button>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default FeaturedJobs;