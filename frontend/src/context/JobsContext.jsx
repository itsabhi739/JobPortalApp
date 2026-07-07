import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Search } from "lucide-react";

const JobsContext = createContext();

axios.defaults.withCredentials = true;


const JobsProvider = ({children})=>{
    const [keyword,setKeyword] = useState('')
    const [location,setLocation] = useState('');
    const [jobs, setJobs] = useState([]);
    const {backendURL} = useContext(AuthContext);
    
    const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/job/jobs/all?keyword=${keyword}&&location=${location}`,
      );
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    fetchJobs,
    jobs,
    setJobs,
    keyword,setKeyword,
    location,setLocation
  }
    
    return <JobsContext.Provider value={value}>
        {children}
    </JobsContext.Provider>
}


export {JobsProvider,JobsContext};