import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Welcome';
import StatCards from '../components/StatCards';
import ApplicationsChart from '../components/ApplicationsChart';
import JobsChart from '../components/JobsChart';
import AppliedJobs from '../components/AppliedJobs';
import { AuthContext } from '../context/AuthContext';
import { JobsContext } from '../context/JobsContext';

const StudentDashboard = () => {
  const { userData } = useContext(AuthContext);
  const { jobs, fetchJobs, myApplications, fetchMyApplications } = useContext(JobsContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      fetchJobs();
      fetchMyApplications();
    }
  }, [userData]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar user={userData} isStudent />
      <div className="flex-1 bg-[#F8FAFC] min-h-screen p-4 lg:p-6">
        <div className="space-y-4 lg:space-y-5">
          <Welcome user={userData} jobs={jobs} applications={myApplications} isStudent />
          <StatCards jobs={jobs} applications={myApplications} />

          <div className="grid gap-4 xl:grid-cols-3">
            <ApplicationsChart applications={myApplications} />
            <JobsChart jobs={jobs} />
            <AppliedJobs applications={myApplications.slice(0, 4)} onSeeMore={() => navigate('/my-applications')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;