import { Search, MapPin, Briefcase } from "lucide-react";
import { Globe, Users, ArrowRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { CompanyContext } from "../context/CompanyContext";
import { JobsContext } from "../context/JobsContext";
import { useNavigate } from "react-router-dom";


const Companies = () => {
  
  const { backendURL } = useContext(AuthContext);
  const {fetchCompanies,companies,setCompanies,search,setSearch} = useContext(CompanyContext);
  const {jobs} = useContext(JobsContext)
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(()=>{
      fetchCompanies();
    },500)
    return ()=> clearTimeout(timer);
  },[search]);



  const handleChange = (e)=>{
    const {name, value} = e.target;
    if(name === "search"){
      setSearch(value)
    }
  }

  return (
      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-[#1E246D] via-[#2F368C] to-[#5365E8] text-white overflow-hidden py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold">Explore Top Companies</h1>

            <p className="mt-4 text-lg text-gray-200">
              Discover companies actively hiring students and freshers.
            </p>

            <div className="bg-white rounded-2xl p-4 mt-8 flex gap-4">
              <input
                type="text"
                name='search'
                placeholder="Search company..."
                className="flex-1 outline-none text-black px-4"
                value={search}
                onChange={handleChange}
              />

              <button className="bg-[#F4BC19] text-black px-6 py-3 rounded-xl flex items-center gap-2 font-semibold" >
                <Search size={18} />
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h2 className="text-4xl font-bold text-[#2F368C]">{companies.length}</h2>
              <p className="text-gray-500 mt-2">Partner Companies</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h2 className="text-4xl font-bold text-[#2F368C]">1200+ </h2>
              <p className="text-gray-500 mt-2">Active Jobs</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h2 className="text-4xl font-bold text-[#2F368C]">95%</h2>
              <p className="text-gray-500 mt-2">Hiring Success Rate</p>
            </div>
          </div>
        </section>

        {/* Companies Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Companies</h2>

            <span className="text-gray-500">{companies.length} Companies</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <div key={index} className="w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                {/* Banner */}
                <div className="relative h-32">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/25" />

                  {/* Logo */}
                  <div className="absolute -bottom-8 left-4">
                    <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-md">
                      <img
                        src={
                          "https://imgs.search.brave.com/R4Wo-7mW5H1hTMdFXxmzgJS6ZSl5vMgYv-510tJ-GOk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmxv/Z29zLWRvd25sb2Fk/LmNvbS8xMTM5NzEv/Mjk1ODUtczEyODAt/NmQzMmNlMjM5YzAz/Mjg3NWFkYWU4NTk0/ZGQ3MjUxYzEucG5n/L1RhdGFfQ29uc3Vs/dGFuY3lfU2Vydmlj/ZXNfTG9nb18yMDIw/X2Z1bGxfc3RhY2tl/ZC1zMTI4MC5wbmc"
                        }
                        alt={company.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-10 px-4 pb-4">
                  <h2 className="text-lg font-semibold truncate">
                    {company.name}
                  </h2>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin size={14} />
                    <span>{company.location}</span>
                  </div>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {company.description}
                  </p>

                  {/* Info */}
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe size={15} className="text-blue-500" />
                      <span className="truncate">{company.website}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={15} className="text-green-500" />
                      <span>{company.userCount??company.userId?.length??0} Users</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"  onClick={() => navigate(`/jobs?company=${company._id}`)}>
                    View Jobs
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-[#2F368C] rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold">Looking for Talent?</h2>

            <p className="mt-4 text-gray-200">
              Join our placement network and hire top students.
            </p>

            <button className="bg-[#F4BC19] text-black px-8 py-4 rounded-xl font-semibold mt-8">
              Register as Recruiter
            </button>
          </div>
        </section>
      </div>
  );
};

export default Companies;
