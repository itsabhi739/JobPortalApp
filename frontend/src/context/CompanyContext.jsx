import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Search } from "lucide-react";

const CompanyContext = createContext();

axios.defaults.withCredentials = true;


const CompanyProvider = ({children})=>{
    const [search,setSearch] = useState('')
    const [allCompanies, setAllCompanies] = useState([]);
    const [companies, setCompanies] = useState([]);
    const {backendURL} = useContext(AuthContext);

    const fetchCompanies = async (query = search) => {
      try {
        const response = await axios.get(
          `${backendURL}/api/company/companies/all?search=${encodeURIComponent(query || '')}`,
        );
        if (response.data.success) {
          setAllCompanies(response.data.companies);
          setCompanies(response.data.companies);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  const value = {
    fetchCompanies,
    allCompanies,
    companies,
    setCompanies,search,setSearch
  }
    
    return <CompanyContext.Provider value={value}>
        {children}
    </CompanyContext.Provider>
}


export {CompanyProvider,CompanyContext};