import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Search } from "lucide-react";

const CompanyContext = createContext();

axios.defaults.withCredentials = true;


const CompanyProvider = ({children})=>{
    const [search,setSearch] = useState('')
    const [companies, setCompanies] = useState([]);
    const {backendURL} = useContext(AuthContext);
    
    const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/company/companies/all?search=${search}`,
      );
      if (response.data.success) {
        setCompanies(response.data.companies);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    fetchCompanies,
    companies,
    setCompanies,search,setSearch
  }
    
    return <CompanyContext.Provider value={value}>
        {children}
    </CompanyContext.Provider>
}


export {CompanyProvider,CompanyContext};