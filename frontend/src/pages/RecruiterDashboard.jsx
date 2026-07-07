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
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 bg-[#F8FAFC] min-h-screen p-4 lg:p-6">
        <div className="space-y-4 lg:space-y-5">
          <Welcome />
          <StatCards />

          <div className="grid gap-4 xl:grid-cols-3">
            <ApplicationsChart />
            <JobsChart />
            <TopApplicants />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.45fr_0.85fr]">
            <RecentJobs />
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;