import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  ExternalLink,
  Globe,
  MapPin,
  Pencil,
  Save,
  Users,
  X,
} from "lucide-react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import Seo from "../components/Seo";
import { SITE_URL } from "../seoConfig";

const emptyForm = {
  name: "",
  description: "",
  website: "",
  location: "",
  logo: "",
  coverImage: "",
};

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendURL, userData } = useContext(AuthContext);
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userCompanyId = userData?.company || userData?.profile?.company;
  const canManageCompany = userData?.role === "Admin"
    || (userData?.role === "Recruiter" && String(userCompanyId) === id);
  const canCreateJob = userData?.role === "Recruiter" && String(userCompanyId) === id;

  useEffect(() => {
    let isCurrent = true;
    const fetchCompany = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const { data } = await axios.get(`${backendURL}/api/company/get/${id}`);
        if (isCurrent) {
          setCompany(data.company);
          setJobs(data.jobs || []);
          setUserCount(data.userCount || 0);
          setFormData({
            name: data.company.name || "",
            description: data.company.description || "",
            website: data.company.website || "",
            location: data.company.location || "",
            logo: data.company.logo || "",
            coverImage: data.company.coverImage || "",
          });
        }
      } catch (error) {
        if (isCurrent) {
          setErrorMessage(error.response?.data?.message || "Unable to load this company profile.");
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    fetchCompany();
    return () => {
      isCurrent = false;
    };
  }, [backendURL, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleEdit = () => {
    setFormData({
      name: company.name || "",
      description: company.description || "",
      website: company.website || "",
      location: company.location || "",
      logo: company.logo || "",
      coverImage: company.coverImage || "",
    });
    setIsEditing(true);
    setErrorMessage("");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    try {
      const { data } = await axios.patch(
        `${backendURL}/api/company/update/${id}`,
        formData,
      );
      setCompany(data.company);
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Unable to update the company profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <main className="min-h-screen bg-[#F8FAFC]"><Loader className="py-24" /></main>;
  }

  if (!company) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-6 py-20">
        <Seo title="Company Not Found" noindex />
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold ">Company profile unavailable</h1>
          <p className="mt-3 text-red-700">{errorMessage}</p>
          <Link to="/companies" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#1E246D] dark:text-[#A5B4FC]">
            <ArrowLeft size={18} /> Back to companies
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="company-profile-page min-h-screen bg-[#F8FAFC] pb-16">
      <Seo
        title={`${company.name} Jobs, Careers & Company Profile`}
        description={`${company.name}${company.location ? ` (${company.location})` : ""} is hiring on AbhiJob with ${jobs.length} open position${jobs.length === 1 ? "" : "s"}. ${company.description || ""}`}
        path={`/company/${id}`}
        image={company.logo || undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: company.name,
          description: company.description,
          url: company.website || `${SITE_URL}/company/${id}`,
          ...(company.logo && { logo: company.logo }),
          ...(company.location && { address: { "@type": "PostalAddress", addressLocality: company.location } }),
        }}
      />
      <section
        className="relative overflow-hidden bg-linear-to-br from-[#1E246D] via-[#2F368C] to-[#5365E8] text-white"
        style={company.coverImage ? {
          backgroundImage: `linear-gradient(110deg, rgba(30,36,109,.94), rgba(30,36,109,.75), rgba(30,36,109,.58)), url("${company.coverImage}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        } : undefined}
      >
        <div className="mx-auto max-w-7xl px-6 pb-36 pt-10">
          <Link to="/companies" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
            <ArrowLeft size={17} /> All companies
          </Link>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white/80 bg-white text-3xl font-bold text-[#1E246D] dark:text-[#A5B4FC] shadow-xl">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="h-full w-full object-contain p-2"
                        onError={(event) => { event.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                  company.name.slice(0, 1).toUpperCase()
                    )}
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Company profile</p>
                <h1 className="mt-2 text-3xl font-bold md:text-5xl">{company.name}</h1>
                {company.location && (
                  <p className="mt-3 flex items-center gap-2 text-white/80">
                    <MapPin size={17} /> {company.location}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {canCreateJob && (
                <button
                  type="button"
                  onClick={() => navigate("/createjobs")}
                  className="rounded-xl bg-[#F4BC19] px-5 py-3 font-semibold text-[#111827] dark:text-[#111827] transition hover:bg-yellow-300"
                >
                  Create a job
                </button>
              )}
              {canManageCompany && !isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
                >
                  <Pencil size={17} /> Edit profile
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-22 max-w-7xl px-6 pb-2">
        <section className="company-profile-surface grid gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-5">
            <BriefcaseBusiness className="text-[#6055FF] dark:text-[#A5B4FC]" size={25} />
            <div><p className="text-2xl font-bold">{jobs.length}</p><p className="text-sm text-gray-500">Open positions</p></div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-5">
            <Users className="text-yellow-600" size={25} />
            <div><p className="text-2xl font-bold">{userCount}</p><p className="text-sm text-gray-500">Team members</p></div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-5">
            <Building2 className="text-green-600" size={25} />
            <div><p className="text-2xl font-bold">{company.location || "—"}</p><p className="text-sm text-gray-500">Headquarters</p></div>
          </div>
        </section>

        {errorMessage && (
          <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {isEditing && (
          <section className="company-profile-surface mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold ">Edit company profile</h2>
              <p className="mt-1 text-sm text-gray-500">Update company information and image URLs.</p>
            </div>
            <form onSubmit={handleSave} className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium ">
                Company name
                <input name="name" value={formData.name} onChange={handleChange} required maxLength={120} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1E246D] focus:ring-2 focus:ring-[#1E246D]/10" />
              </label>
              <label className="text-sm font-medium ">
                Location
                <input name="location" value={formData.location} onChange={handleChange} maxLength={160} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1E246D] focus:ring-2 focus:ring-[#1E246D]/10" />
              </label>
              <label className="text-sm font-medium ">
                Website
                <input name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://company.com" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1E246D] focus:ring-2 focus:ring-[#1E246D]/10" />
              </label>
              <label className="text-sm font-medium ">
                Logo image URL
                <input name="logo" type="url" value={formData.logo} onChange={handleChange} placeholder="https://company.com/logo.png" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1E246D] focus:ring-2 focus:ring-[#1E246D]/10" />
              </label>
              <label className="text-sm font-medium  md:col-span-2">
                Cover image URL
                <input name="coverImage" type="url" value={formData.coverImage} onChange={handleChange} placeholder="https://company.com/cover.jpg" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1E246D] focus:ring-2 focus:ring-[#1E246D]/10" />
              </label>
              <label className="text-sm font-medium  md:col-span-2">
                About the company
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={6} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1E246D] focus:ring-2 focus:ring-[#1E246D]/10" />
              </label>
              <div className="flex flex-wrap justify-end gap-3 md:col-span-2">
                <button type="button" onClick={() => { setIsEditing(false); setErrorMessage(""); }} disabled={isSaving} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold  hover:bg-slate-50 disabled:opacity-60">
                  <X size={17} /> Cancel
                </button>
                <button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 rounded-xl bg-[#1E246D] px-5 py-3 font-semibold text-white hover:bg-[#1E246D] disabled:opacity-60">
                  <Save size={17} /> {isSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </section>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <section className="company-profile-surface rounded-2xl border border-gray-100 bg-white p-6 shadow-md lg:col-span-1">
            <h2 className="text-lg font-bold">About {company.name}</h2>
            <p className="mt-4 whitespace-pre-line leading-7 text-gray-500">{company.description}</p>
            {company.website && (
              <a href={company.website} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 break-all font-semibold text-[#1E246D] dark:text-[#A5B4FC] hover:text-[#5365E8]">
                <Globe size={18} /> {company.website} <ExternalLink size={15} />
              </a>
            )}
          </section>

          <section id="open-roles" className="scroll-mt-24 lg:col-span-2">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Careers</p>
                <h2 className="mt-1 text-lg font-bold">Open positions</h2>
              </div>
              <span className="text-sm text-gray-500">{jobs.length} opportunities</span>
            </div>

            {jobs.length === 0 ? (
              <div className="company-profile-surface rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
                <BriefcaseBusiness className="mx-auto text-[#1E246D] dark:text-[#A5B4FC]/40" size={34} />
                <h3 className="mt-4 text-lg font-bold">No open positions right now</h3>
                <p className="mt-2 text-sm text-gray-500">Check back later for new opportunities from {company.name}.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <article key={job._id} className="company-profile-surface rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-lg font-bold">{job.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{job.position} · {job.location} · {job.jobType}</p>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">{job.description}</p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2">
                        <Link to={`/job/${job._id}`} className="rounded-xl border border-[#1E246D]/30 px-4 py-2.5 text-sm font-semibold text-[#1E246D] dark:text-[#A5B4FC] hover:bg-[#1E246D]/5">
                          View job
                        </Link>
                        {job.applyLink && /^https?:\/\//i.test(job.applyLink) && (
                          <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#F4BC19] px-4 py-2.5 text-sm font-semibold text-[#111827] dark:text-[#111827] hover:bg-yellow-300">
                            Apply <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default CompanyProfile;
