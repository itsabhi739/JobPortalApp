import React from 'react'
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Welcome';
import StatCards from '../components/StatCards';
import ApplicationsChart from '../components/ApplicationsChart';
import JobsChart from '../components/JobsChart';
import TopApplicants from '../components/TopApplicants';
import RecentJobs from '../components/RecentJobs';
import Notifications from '../components/Notifications';

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
  const {jobs} = useContext(JobsContext)
  const userCompany = companies.find(
    (company) => company.name === userData.companyName,
  );

  console.log(jobs);
  console.log(userData)
  const userJobs = jobs.filter(
  (job) => job.createdBy === userData.userId
  );

  console.log("Job created by user:",userJobs)
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
            <RecentJobs user={userData} userJobs={userJobs}/>
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;