import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Auth from './pages/Auth.jsx'
import { ToastContainer} from "react-toastify";
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

function App() {
  const location = useLocation();
  
  // Hide navbar on auth pages
  const hideNavbarRoutes = ['/login', '/verify-email', '/reset-password'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  
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
      <Route path="/register-company" element={<RegisterCompany />} />
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
