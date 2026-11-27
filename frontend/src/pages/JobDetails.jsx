import { useContext, useEffect, useState } from "react";
import { ArrowLeft, Briefcase, FileText, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { JobsContext } from "../context/JobsContext";
import Loader from "../components/Loader";
import Seo from "../components/Seo";
import { SITE_URL } from "../seoConfig";

const EMPLOYMENT_TYPES = {
  "Full Time": "FULL_TIME",
  "Part Time": "PART_TIME",
  Internship: "INTERN",
  Remote: "FULL_TIME",
};

// schema.org JobPosting -> eligible for the Google Jobs search experience.
const buildJobPosting = (job, id) => {
  const isRemote = job.jobType === "Remote" || /remote/i.test(job.location || "");
  const salaryNumber = Number(String(job.salary || "").replace(/[,₹\s]/g, ""));

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.description, job.requirements?.length ? `Requirements: ${job.requirements.join(", ")}` : ""]
      .filter(Boolean)
      .join("\n\n"),
    identifier: { "@type": "PropertyValue", name: "AbhiJob", value: id },
    url: `${SITE_URL}/job/${id}`,
    ...(job.createdAt && { datePosted: new Date(job.createdAt).toISOString().split("T")[0] }),
    employmentType: EMPLOYMENT_TYPES[job.jobType] || "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company?.name || "AbhiJob",
      ...(job.company?.website && { sameAs: job.company.website }),
      ...(job.company?.logo && { logo: job.company.logo }),
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" },
    },
    ...(isRemote && {
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "Country", name: "India" },
    }),
    // Only emit a salary when it is a plain number; free text like "5-8 LPA" would be invalid.
    ...(Number.isFinite(salaryNumber) && salaryNumber > 0 && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "INR",
        value: { "@type": "QuantitativeValue", value: salaryNumber, unitText: salaryNumber >= 100000 ? "YEAR" : "MONTH" },
      },
    }),
    ...(job.experience && { experienceRequirements: job.experience }),
    ...(job.requirements?.length && { skills: job.requirements.join(", ") }),
    directApply: !job.applyLink,
  };
};

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendURL, userData } = useContext(AuthContext);
  const { applyToJob, myApplications, fetchMyApplications } = useContext(JobsContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/job/get/${id}`);
        if (!data.success) throw new Error(data.message);
        setJob(data.job);
        if (userData?.role === "Student") await fetchMyApplications();
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Unable to load job");
      } finally { setLoading(false); }
    };
    loadJob();
  }, [id, backendURL, userData?.role]);

  const alreadyApplied = myApplications.some((application) => String(application.job?._id || application.job) === String(id));
  const apply = async () => {
    if (!userData) return navigate("/login");
    setApplying(true);
    const result = await applyToJob(id);
    setApplying(false);
    if (result.success) toast.success(result.alreadyApplied ? "Already applied to this job." : "Application submitted successfully.");
    else toast.error(result.message || "Unable to apply");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
  if (!job) return <main className="min-h-screen flex items-center justify-center text-gray-500"><Seo title="Job Not Found" noindex />Job not found.</main>;

  const jobIsActive = job.status === "Active";
  const companyName = job.company?.name || "a top company";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <Seo
        title={`${job.title} at ${companyName}${job.location ? ` in ${job.location}` : ""}`}
        description={`${job.jobType || "Job"} opening for ${job.title} at ${companyName}${job.location ? `, ${job.location}` : ""}. Experience: ${job.experience || "Any"}. Salary: ₹${job.salary}. ${job.description || ""}`}
        path={`/job/${id}`}
        type="article"
        image={job.company?.logo || undefined}
        // Google requires JobPosting markup to be removed once a job stops accepting applications.
        jsonLd={jobIsActive ? buildJobPosting(job, id) : undefined}
      />
      <div className="max-w-5xl mx-auto">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#6055FF] font-medium mb-6">
          <ArrowLeft size={18} /> Back
        </button>
        <section className="bg-linear-to-br from-[#1E246D] via-[#6055FF] to-[#434EC1] text-white rounded-3xl p-8 md:p-12">
          <span className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-sm">
            <Briefcase size={16} /> {job.jobType}
          </span>
          <h1 className="text-4xl font-bold mt-5">{job.title}</h1>
          <p className="text-white/80 text-lg mt-2">{job.company?.name || "Company"}</p>
          <div className="flex flex-wrap gap-5 mt-6 text-white/90">
            <span className="flex items-center gap-2"><MapPin size={18} /> {job.location}</span>
            <span>₹{job.salary}</span>
            <span>{job.experience} experience</span>
          </div>
        </section>
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 mt-6">
          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-800">Job description</h2>
            <p className="text-gray-600 whitespace-pre-line mt-4">{job.description}</p>
            <h2 className="text-2xl font-bold text-slate-800 mt-8">Requirements</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {(job.requirements || []).map((requirement) => (
                <span key={requirement} className="bg-blue-100 text-[#6055FF] px-3 py-2 rounded-lg text-sm">{requirement}</span>
              ))}
            </div>
          </section>
          <aside className="bg-white rounded-2xl border border-slate-200 p-6 h-fit">
            <h2 className="font-bold text-slate-800">Ready to apply?</h2>
            <div className="flex items-center justify-between mt-3 text-sm">
              <span className="text-gray-500">Job status</span>
              <span className={`font-semibold ${jobIsActive ? "text-green-700" : "text-slate-600"}`}>
                {job.status || "Status unavailable"}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-2">Your latest profile resume will be attached to this application.</p>
            {userData?.profile?.resume ? (
              <a href={`${backendURL}${userData.profile.resume}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#6055FF] text-sm mt-5">
                <FileText size={16} /> {userData.profile.resumeOriginalName || "View current resume"}
              </a>
            ) : (
              <p className="text-amber-600 text-sm mt-5">Upload a resume in your profile first.</p>
            )}
            <button
              type="button"
              disabled={alreadyApplied || applying || !jobIsActive}
              onClick={apply}
              className="w-full mt-6 bg-[#6055FF] text-white rounded-xl py-3 font-semibold disabled:opacity-60"
            >
              {applying ? "Applying..." : alreadyApplied ? "Applied" : jobIsActive ? "Apply Now" : "Not accepting applications"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default JobDetails;
