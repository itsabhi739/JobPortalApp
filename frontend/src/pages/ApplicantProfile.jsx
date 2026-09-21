import { useContext, useEffect, useState } from "react";
import { ArrowLeft, FileText, Mail, Phone, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const ApplicantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendURL } = useContext(AuthContext);
  const [applicant, setApplicant] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const assetUrl = (asset) => asset?.startsWith("http") ? asset : asset ? `${backendURL}${asset}` : "";

  useEffect(() => {
    const loadApplicant = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/job/recruiter-applicants/${id}`);
        if (!data.success) throw new Error(data.message);
        setApplicant(data.applicant);
        setApplications(data.applications || []);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Unable to load applicant");
      } finally { setLoading(false); }
    };
    loadApplicant();
  }, [backendURL, id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
  if (!applicant) return <div className="min-h-screen flex items-center justify-center text-gray-500">Applicant not found.</div>;

  return <main className="min-h-screen bg-slate-50 px-6 py-10"><div className="max-w-5xl mx-auto"><button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#6055FF] font-medium mb-6"><ArrowLeft size={18} /> Back to applications</button><section className="bg-white rounded-2xl border border-slate-200 p-6"><div className="flex flex-col sm:flex-row gap-5 items-start"><div>{applicant.profile?.profilePhoto ? <img src={assetUrl(applicant.profile.profilePhoto)} alt={applicant.username} className="w-28 h-28 rounded-2xl object-cover" /> : <div className="w-28 h-28 rounded-2xl bg-[#6055FF] text-white flex items-center justify-center"><UserRound size={48} /></div>}</div><div><h1 className="text-3xl font-bold text-slate-800">{applicant.username}</h1><p className="text-gray-500 mt-2 flex items-center gap-2"><Mail size={16} /> {applicant.email}</p>{applicant.phonenumber && <p className="text-gray-500 mt-2 flex items-center gap-2"><Phone size={16} /> {applicant.phonenumber}</p>}<p className="text-gray-600 mt-4">{applicant.profile?.bio || "No bio added."}</p></div></div></section><div className="grid lg:grid-cols-2 gap-6 mt-6"><section className="bg-white rounded-2xl border border-slate-200 p-6"><h2 className="text-xl font-bold text-slate-800">Qualifications</h2><dl className="space-y-4 mt-5"><div><dt className="text-sm text-gray-500">Education</dt><dd className="font-medium mt-1">{applicant.profile?.education || "Not provided"}</dd></div><div><dt className="text-sm text-gray-500">Experience</dt><dd className="font-medium mt-1">{applicant.profile?.experience || "Not provided"}</dd></div><div><dt className="text-sm text-gray-500">Skills</dt><dd className="font-medium mt-1">{applicant.profile?.skills?.join(", ") || "Not provided"}</dd></div></dl></section><section className="bg-white rounded-2xl border border-slate-200 p-6"><h2 className="text-xl font-bold text-slate-800">Resume</h2>{applicant.profile?.resume ? <a href={assetUrl(applicant.profile.resume)} download={applicant.profile.resumeOriginalName || true} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 bg-[#6055FF] text-white px-4 py-3 rounded-xl"><FileText size={18} /> Download / View Resume</a> : <p className="text-gray-500 mt-5">No resume uploaded.</p>}</section></div><section className="bg-white rounded-2xl border border-slate-200 p-6 mt-6"><h2 className="text-xl font-bold text-slate-800">Applications for your jobs</h2><div className="space-y-3 mt-5">{applications.map((application) => <div key={application._id} className="flex items-center justify-between border-b border-slate-100 pb-3"><span>{application.job?.title || "Job"}</span><span className="capitalize text-sm">{application.status}</span></div>)}</div></section></div></main>;
};

export default ApplicantProfile;
