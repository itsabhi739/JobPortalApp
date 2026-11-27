import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CompanyContext } from "../context/CompanyContext";
import { JobsContext } from "../context/JobsContext";


const Hero = () => {
  const navigate = useNavigate();
  const {isLoggedIn,isStudent} = useContext(AuthContext);
  const {allCompanies} = useContext(CompanyContext);
  const {jobs} = useContext(JobsContext);
  const activeJobs = jobs.filter((job) => job.status === "Active").length;
  
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <span className="bg-blue-100 text-primary px-4 py-2 rounded-full">
            Your Career Starts Here
          </span>

          <h1 className="text-5xl font-bold mt-6 leading-tight">
            Find Your
            <span className="text-secondary"> Dream Job </span>
            Faster
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            Connect with top companies, apply for jobs and internships,
            and get placed through AbhiJob, a smart placement management system for students and recruiters.
          </p>

          <div className="flex gap-4 mt-8">
            {isLoggedIn && isStudent?
            (<button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl" onClick={()=>navigate('/jobs')}>
              Find Jobs
            </button>)
            :isLoggedIn && !isStudent?(
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl" onClick={()=>navigate('/createjobs')}>
              Create Jobs
            </button>):(
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl" onClick={()=>navigate('/jobs')}>
              Explore Jobs
            </button>
            )}

            {isLoggedIn && isStudent?
            (<button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition" onClick={()=>navigate(`/profile`)}>
              Upload Resume
            </button>):
            isLoggedIn && !isStudent?
            (
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition" onClick={()=>navigate("/recruiter-dashboard")}>
              Check Applicants
            </button>):(
               <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition" onClick={()=>navigate("/register-company")}>
              Register Company
            </button>
            )}
          </div>

          <dl className="flex gap-10 mt-10">
            <div className="flex flex-col-reverse">
              <dt>Companies</dt>
              <dd className="text-2xl font-bold">{allCompanies.length}</dd>
            </div>

            <div className="flex flex-col-reverse">
              <dt>Active Jobs</dt>
              <dd className="text-2xl font-bold">{activeJobs}</dd>
            </div>

            <div className="flex flex-col-reverse">
              <dt>Total Jobs</dt>
              <dd className="text-2xl font-bold">{jobs.length}</dd>
            </div>
          </dl>
        </div>

        <div>
          <img src="https://imgs.search.brave.com/aCibjpLseejKFW1zWGlMJrDOhUdiN2LxxvdhVRYfdCw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbGFj/cml0eXMuaW4vd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMTIv/Q29uc3VsdGluZy1E/ZXNpZ24tUHJvZmVz/c2lvbmFscy1mb3It/T2ZmaWNlLVdhbGxw/YXBlci53ZWJw" alt="Students and recruiters collaborating in a modern office" width="860" height="573" fetchPriority="high" decoding="async" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;