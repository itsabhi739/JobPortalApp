import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Welcome';
import StatCards from '../components/StatCards';
import ApplicationsChart from '../components/ApplicationsChart';
import JobsChart from '../components/JobsChart';
import TopApplicants from '../components/TopApplicants';
import RecentJobs from '../components/RecentJobs';
import Notifications from '../components/AppliedJobs';
import { AuthContext } from '../context/AuthContext';
import { CompanyContext } from '../context/CompanyContext';
import { JobsContext } from '../context/JobsContext';

const RecruiterDashboard = () => {
  const {
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    inputClass,
  } = useContext(AuthContext);
  const { companies } = useContext(CompanyContext);
  const {jobs,fetchJobs,updateJob,deleteJob,viewJob} = useContext(JobsContext)
  const [userJobs,setUserJobs] = useState([]);
  const [userCompany,setUserCompany] = useState(null);
  const [jobsLoading, setJobsLoading] = useState(true);

  const getJobsAndCompany = (fetchedJobs = jobs)=>{
    const company = companies.find(
      (company) => company.name === userData?.companyName,
    );
    const jobsCreated = fetchedJobs.filter((job) => {
      const createdBy = job.createdBy?._id || job.createdBy;
      return String(createdBy) === String(userData?.userId);
    });
    setUserJobs(jobsCreated);
    setUserCompany(company);
  }

  useEffect(()=>{
    if(!userData) return;

    let isCurrent = true;
    setJobsLoading(true);

    const loadRecruiterJobs = async () => {
      const fetchedJobs = await fetchJobs();
      if (!isCurrent) return;
      getJobsAndCompany(fetchedJobs);
      setJobsLoading(false);
    };

    loadRecruiterJobs();

    return () => {
      isCurrent = false;
    };
  },[userData,companies])

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar user={userData} companyLocation={userCompany?.location} />
      <div className="flex-1 bg-[#F8FAFC] min-h-screen p-4 lg:p-6">
        <div className="space-y-4 lg:space-y-5">
          <Welcome user={userData} />
          <StatCards userJobs={userJobs} />

          <div className="grid gap-4 xl:grid-cols-3">
            <ApplicationsChart />
            <JobsChart />
            <TopApplicants />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.45fr_0.85fr]">
            <RecentJobs user={userData} userJobs={userJobs} loading={jobsLoading} updateJob={updateJob} deleteJob={deleteJob}/>
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;