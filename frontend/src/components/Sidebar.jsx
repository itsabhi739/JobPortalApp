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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({user,companyLocation,viewid}) => {
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);
  return (
    <div className="w-72 min-h-screen bg-white border-r shadow-sm flex flex-col">

      {/* Company */}

      <div className="m-5 bg-[#F8FAFC] rounded-2xl p-5 border">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-[#2F368C] text-white flex items-center justify-center font-bold text-xl">
            G
          </div>

          <div>
            <h3 className="font-semibold">{user?.companyName}</h3>

            <p className="text-sm text-gray-500">{companyLocation}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <div className="px-4 space-y-2 flex-1">
        <button className="w-full flex items-center gap-4 bg-[#EEF2FF] text-[#2F368C] rounded-xl px-5 py-4 font-semibold">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4"
        onClick={()=>navigate("/jobs")}>
          <BriefcaseBusiness size={20} />
          Jobs
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4"
        onClick={()=>navigate('/createjobs')}>
          <PlusCircle size={20} />
          Create Job
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4">
          <Users size={20} />
          Applications
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4">
          <Building2 size={20} />
          {/* <Building2 size={20} onClick={()=>navigate(`/view-job/:${viewid}`)}/> */}
          Company Profile
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4">
          <BarChart3 size={20} />
          Analytics
        </button>

        <button className="w-full flex items-center gap-4 hover:bg-gray-100 rounded-xl px-5 py-4">
          <Star size={20} />
          Shortlisted
        </button>
      </div>

      {/* CTA */}

      <div className="p-5">
        <button className="w-full bg-[#2F368C] hover:bg-[#434ec1] text-white rounded-xl py-4 font-semibold" onClick={()=>navigate("/createjobs")}>
          + Create New Job
        </button>
      </div>

      {/* Logout */}

      <div className="border-t p-5">
        <button className="w-full flex items-center justify-center gap-3 text-red-500 hover:bg-red-50 rounded-xl py-3" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
