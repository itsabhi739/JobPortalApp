import './App.css'
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Auth from './pages/Auth.jsx'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from './pages/VerifyEmail.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { PrivateRoute } from './components/PrivateRoutes.jsx'
import Jobs from './pages/Jobs.jsx'
import Companies from './pages/Companies.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import RecruiterDashboard from './pages/RecruiterDashboard.jsx'
import { Search } from 'lucide-react'
import CreateJobs from './pages/CreateJobs.jsx'
import RegisterCompany from './pages/RegisterCompany.jsx'
import ContactUs from './pages/ContactUs.jsx'
import UpdateJobs from './pages/UpdateJobs.jsx'
import MyApplications from './pages/MyApplications.jsx'

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/verify-email', '/reset-password'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    const saved = sessionStorage.getItem('jobPortalApplyToast');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      toast.info(data.message || 'Application started successfully.');
    } catch (error) {
      toast.info('Application started successfully.');
    } finally {
      sessionStorage.removeItem('jobPortalApplyToast');
    }
  }, [location.pathname]);
  
  return (
    <>
    {showNavbar && <Navbar/>}
    <Routes>
      {/* Public routes */}
      <Route path='/login' element={<Auth/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      
      {/* Verify Email - only for logged in but unverified users */}
      <Route path='/verify-email' element={<VerifyEmail/>}/>
      
      {/* Protected routes - only verified users */}
      <Route path='/' element={<Home/>}/>
      <Route path='/jobs' element={<Jobs/>}/>
      <Route path='/companies' element={<Companies/>}/>
      <Route path='/admin-dashboard' element={<PrivateRoute><AdminDashboard/></PrivateRoute>}/>
      <Route path='/student-dashboard' element={<PrivateRoute><StudentDashboard/></PrivateRoute>}/>
      <Route path='/recruiter-dashboard' element={<PrivateRoute><RecruiterDashboard/></PrivateRoute>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/createjobs' element={<PrivateRoute><CreateJobs/></PrivateRoute>}/>
      <Route path='/update-job/:id' element={<PrivateRoute><UpdateJobs/></PrivateRoute>}/>
      <Route path='/view-job/:id' element={<PrivateRoute><UpdateJobs/></PrivateRoute>}/>
      <Route path='/my-applications' element={<PrivateRoute><MyApplications /></PrivateRoute>} />
      <Route path="/register-company" element={<RegisterCompany />} />
      <Route path="/contact-us" element={<ContactUs />} />
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
