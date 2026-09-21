import React, { useContext } from "react";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  Building2,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Star,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({user,companyLocation,viewid,isStudent = false}) => {
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);
  const profilePhoto = user?.profile?.profilePhoto;
  const profilePhotoUrl = profilePhoto?.startsWith("http") ? profilePhoto : profilePhoto ? `${import.meta.env.VITE_BACKEND_URL}${profilePhoto}` : "";
  return (
    <div className="w-72 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">

      {/* Profile */}

      <div className="m-5 bg-[#F8FAFC] rounded-2xl p-5 border border-gray-200">
        <div className="flex items-center gap-4">
          {profilePhotoUrl ? <img src={profilePhotoUrl} alt="Profile" className="h-14 w-14 rounded-full object-cover" /> : <div className="h-14 w-14 rounded-full bg-[#6055FF] text-white flex items-center justify-center font-bold text-xl">{user?.username?.[0]?.toUpperCase() || <UserRound size={24} />}</div>}

          <div>
            <h3 className="font-semibold">{isStudent ? user?.username : user?.companyName}</h3>

            <p className="text-sm text-gray-500">{isStudent ? user?.email : companyLocation}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <div className="px-4 space-y-2 flex-1">
        <button className="w-full flex items-center gap-4 bg-primary text-white rounded-xl px-5 py-4 font-semibold hover:bg-primary/90 transition">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4"
        onClick={()=>navigate("/jobs")}>
          <BriefcaseBusiness size={20} />
          Jobs
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4"
        onClick={()=>navigate(isStudent ? '/jobs' : '/createjobs')}>
          <PlusCircle size={20} />
          {isStudent ? "Apply Job" : "Create Job"}
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4" onClick={()=>navigate(isStudent ? '/my-applications' : '/recruiter-dashboard')}>
          <Users size={20} />
          {isStudent ? "My Applications" : "Applications"}
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4" onClick={()=>navigate(isStudent ? '/profile' : '/recruiter-dashboard')}>
          <Building2 size={20} />
          {/* <Building2 size={20} onClick={()=>navigate(`/view-job/:${viewid}`)}/> */}
          {isStudent ? "Update Profile" : "Company Profile"}
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4">
          <BarChart3 size={20} />
          Analytics
        </button>

        {!isStudent && <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4">
          <Star size={20} />
          Shortlisted
        </button>}
      </div>

      {/* CTA */}

      <div className="p-5">
        <button className="w-full bg-[#6055FF] hover:bg-[#434ec1] text-white rounded-xl py-4 font-semibold" onClick={()=>navigate(isStudent ? "/profile" : "/createjobs")}>
          {isStudent ? "Update Profile" : "+ Create New Job"}
        </button>
      </div>

      {/* Logout */}

      <div className="border-t border-gray-200 p-5">
        <button className="w-full flex items-center justify-center gap-3 text-red-500 hover:bg-red-50 rounded-xl py-3" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
