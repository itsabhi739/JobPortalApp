import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JobsContext = createContext();

axios.defaults.withCredentials = true;


const JobsProvider = ({children})=>{
    const [keyword,setKeyword] = useState('')
    const [location,setLocation] = useState('');
    const [jobs, setJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const {backendURL, userData} = useContext(AuthContext);

    const navigate = useNavigate();
    
    const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/job/jobs/all?keyword=${keyword}&&location=${location}`,
      );
      if (response.data.success) {
        const fetchedJobs = response.data.jobs || [];
        setJobs(fetchedJobs);
        return fetchedJobs;
      }
      return [];
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const fetchMyApplications = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/job/my-applications`);
      if (response.data.success) {
        setMyApplications(response.data.applications || []);
      }
    } catch (error) {
      console.log(error.message);
      setMyApplications([]);
    }
  };

  const applyToJob = async (jobId) => {
    try {
      const response = await axios.post(`${backendURL}/api/job/apply`, { jobId });
      if (response.data.success) {
        await fetchMyApplications();
        return response.data;
      }
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  const createJobs = async (payload) => {
    try{
      const response = await axios.post(`${backendURL}/api/job/create`, payload);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/jobs');
      } else {
        toast.error(response.data.message);
      }
    }catch(e){
      toast.error(e.response?.data?.message || e.message || "Failed to create job");
    }
  };

   const updateJob = async (payload,id) => {
    try{
      const response = await axios.patch(`${backendURL}/api/job/update/${id}`, payload);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }catch(e){
      toast.error(e.response?.data?.message || e.message || "Failed to create job");
    }
  };
  
   const deleteJob = async (id) => {
    try{
      const response = await axios.delete(`${backendURL}/api/job/delete/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchJobs();
      } else {
        toast.error(response.data.message);
      }
    }catch(e){
      toast.error(e.response?.data?.message || e.message || "Failed to create job");
    }
  };

  const viewJob = async(id) =>{

  }

  const experiences = ["0", "1", "2", "3", "4", "5+"];
  
  const locations = [
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Pune",
    "Delhi",
    "Remote",
  ];

  const jobTypes = [
    "Full Time",
    "Part Time",
    "Internship",
    "Remote",
  ];

  const value = {
    fetchJobs,
    fetchMyApplications,
    applyToJob,
    jobs,
    myApplications,
    setJobs,
    keyword,setKeyword,
    location,setLocation,
    experiences,
    locations,
    jobTypes,
    createJobs,
    updateJob,
    deleteJob,
    viewJob
  }
    
    return <JobsContext.Provider value={value}>
        {children}
    </JobsContext.Provider>
}


export {JobsProvider,JobsContext};