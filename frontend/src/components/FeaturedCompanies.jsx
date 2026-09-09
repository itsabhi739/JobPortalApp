import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CompanyContext } from "../context/CompanyContext";

const FeaturedCompanies = () => {

  const {backendURL,inputClass} = useContext(AuthContext);
  const {fetchCompanies,allCompanies} = useContext(CompanyContext);

  useEffect(()=>{
    fetchCompanies('');
  },[])

  //top 6 companies
  const topCompanies = allCompanies.slice(0,6);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted By Top Companies
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">

          {topCompanies.map((company) => (
            <div
              key={company._id}
              className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition flex items-center justify-evenly"
            ><div className="h-10 w-10 object-fit">
              <img src={company.logo} alt="" srcset="" />
            </div>
            <div className="text-black">
              {company.name}
            </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;