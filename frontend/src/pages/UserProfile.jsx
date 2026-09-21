import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FileText, Link as LinkIcon, Pencil, Save, Upload, UserRound, X } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const emptyForm = { username: "", email: "", phonenumber: "", companyName: "", designation: "", bio: "", education: "", experience: "", location: "", skills: "", linkedin: "", portfolio: "" };
const statusStyles = { pending: "bg-yellow-100 text-yellow-700", shortlisted: "bg-blue-100 text-blue-700", accepted: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700" };
const assetUrl = (backendURL, asset) => asset?.startsWith("http") ? asset : asset ? `${backendURL}${asset}` : "";

const UserProfile = () => {
  const { backendURL, userData, getUserData } = useContext(AuthContext);
  const [form, setForm] = useState(emptyForm);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadProfile = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/profile`);
      if (!data.success) throw new Error(data.message);
      const currentUser = { ...userData, ...data.user, profile: { ...(userData?.profile || {}), ...(data.user.profile || {}) } };
      const nextProfile = currentUser.profile || {};
      setProfile(currentUser);
      setApplications(data.applications || []);
      setForm({ username: currentUser.username || "", email: currentUser.email || "", phonenumber: currentUser.phonenumber || "", companyName: currentUser.companyName || "", designation: nextProfile.designation || "", bio: nextProfile.bio || "", education: nextProfile.education || "", experience: nextProfile.experience || "", location: nextProfile.location || "", skills: (nextProfile.skills || []).join(", "), linkedin: nextProfile.linkedin || "", portfolio: nextProfile.portfolio || "" });
    } catch (error) {
      if (userData) {
        const nextProfile = userData.profile || {};
        setProfile(userData);
        setForm({ username: userData.username || "", email: userData.email || "", phonenumber: userData.phonenumber || "", companyName: userData.companyName || "", designation: nextProfile.designation || "", bio: nextProfile.bio || "", education: nextProfile.education || "", experience: nextProfile.experience || "", location: nextProfile.location || "", skills: (nextProfile.skills || []).join(", "), linkedin: nextProfile.linkedin || "", portfolio: nextProfile.portfolio || "" });
      } else {
        toast.error(error.response?.data?.message || error.message || "Unable to load profile");
      }
    } finally { setLoading(false); }
  };

  useEffect(() => { loadProfile(); }, []);
  const displayPhoto = useMemo(() => photoPreview || assetUrl(backendURL, profile?.profile?.profilePhoto), [backendURL, photoPreview, profile]);
  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (resume) payload.append("resume", resume);
    if (profilePhoto) payload.append("profilePhoto", profilePhoto);
    try {
      const { data } = await axios.post(`${backendURL}/api/user/profile/update`, payload);
      if (!data.success) throw new Error(data.message);
      await loadProfile();
      await getUserData();
      setResume(null); setProfilePhoto(null); setPhotoPreview(""); setEditing(false);
      toast.success(data.message);
    } catch (error) { toast.error(error.response?.data?.message || error.message || "Unable to save profile"); }
    finally { setSaving(false); }
  };

  const withdrawApplication = async (applicationId) => {
    try {
      const { data } = await axios.delete(`${backendURL}/api/job/applications/${applicationId}`);
      if (!data.success) throw new Error(data.message);
      setApplications((current) => current.filter((application) => application._id !== applicationId));
      toast.success(data.message);
    } catch (error) { toast.error(error.response?.data?.message || error.message || "Unable to withdraw application"); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;

  const textFields = [["username", "Full name"], ["email", "Email"], ["phonenumber", "Phone number"], ["location", "Location"]];
  const qualificationFields = [["education", "Education"], ["experience", "Experience"], ["skills", "Skills (comma separated)"], ["linkedin", "LinkedIn URL"], ["portfolio", "Portfolio URL"]];
  const isRecruiter = profile?.role === "Recruiter";
  const recruiterFields = [["username", "Full name"], ["email", "Email"], ["phonenumber", "Phone number"], ["designation", "Designation"], ["companyName", "Company"], ["location", "Location"]];

  return <main className="min-h-screen bg-slate-50 px-6 py-10"><div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8"><div><p className="text-[#6055FF] font-semibold">{profile?.role || "Student"} profile</p><h1 className="text-4xl font-bold text-slate-800 mt-1">{isRecruiter ? "Recruiter Profile" : "Student Profile"}</h1><p className="text-gray-500 mt-2">Keep your details and resume ready for every application.</p></div><button type="button" onClick={() => setEditing((current) => !current)} className="self-start bg-[#6055FF] text-white px-5 py-3 rounded-xl flex items-center gap-2">{editing ? <X size={18} /> : <Pencil size={18} />}{editing ? "Cancel editing" : "Edit profile"}</button></div>
    <form onSubmit={saveProfile}>
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"><div className="flex flex-col sm:flex-row gap-6 items-start"><div className="relative shrink-0">{displayPhoto ? <img src={displayPhoto} alt="Profile" className="w-28 h-28 rounded-2xl object-cover" /> : <div className="w-28 h-28 rounded-2xl bg-[#6055FF] text-white flex items-center justify-center"><UserRound size={48} /></div>}{editing && <label className="absolute -right-2 -bottom-2 bg-[#F4BC19] p-2 rounded-full cursor-pointer" title="Upload profile photo"><Upload size={16} /><input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) { setProfilePhoto(file); setPhotoPreview(URL.createObjectURL(file)); } }} /></label>}</div><div className="flex-1 w-full"><h2 className="text-2xl font-bold text-slate-800">{profile?.username}</h2><p className="text-gray-500 mt-1">{profile?.email}</p>{editing ? <textarea name="bio" value={form.bio} onChange={handleChange} rows="3" placeholder="Tell recruiters about yourself" className="w-full border border-slate-300 rounded-xl px-4 py-3 mt-4 outline-none focus:border-[#6055FF]" /> : <p className="text-gray-600 mt-4">{profile?.profile?.bio || "Add a short bio to introduce yourself."}</p>}</div></div></section>
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"><h2 className="text-xl font-bold text-slate-800 mb-5">Personal details</h2><div className="grid md:grid-cols-2 gap-5">{(isRecruiter ? recruiterFields : textFields).map(([name, label]) => <label key={name} className="text-sm font-medium text-slate-600">{label}<input name={name} value={form[name]} onChange={handleChange} disabled={!editing || name === "companyName"} required={isRecruiter} className="w-full border border-slate-300 rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 disabled:text-slate-500" /></label>)}</div></section>
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"><h2 className="text-xl font-bold text-slate-800 mb-5">Qualifications and links</h2><div className="grid md:grid-cols-2 gap-5">{qualificationFields.map(([name, label]) => <label key={name} className="text-sm font-medium text-slate-600">{label}<input name={name} value={form[name]} onChange={handleChange} disabled={!editing} className="w-full border border-slate-300 rounded-xl px-4 py-3 mt-2 disabled:bg-slate-50 disabled:text-slate-500" /></label>)}</div></section>
      {!isRecruiter && <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"><div className="flex items-center gap-2 mb-5"><FileText className="text-[#6055FF]" size={20} /><h2 className="text-xl font-bold text-slate-800">Resume</h2></div><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-dashed border-slate-300 rounded-xl p-4"><div><p className="font-medium text-slate-700">{resume?.name || profile?.profile?.resumeOriginalName || "No resume uploaded"}</p><p className="text-sm text-gray-500 mt-1">PDF or Word document, up to 5 MB</p></div>{editing && <label className="bg-[#F4BC19] text-black px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2"><Upload size={16} /> Choose resume<input type="file" accept="application/pdf,.doc,.docx" className="hidden" onChange={(event) => setResume(event.target.files?.[0] || null)} /></label>}{!editing && profile?.profile?.resume && <a href={assetUrl(backendURL, profile.profile.resume)} target="_blank" rel="noreferrer" className="text-[#6055FF] font-medium flex items-center gap-2"><FileText size={16} /> View resume</a>}</div></section>}
      {editing && <button type="submit" disabled={saving} className="bg-[#6055FF] text-white px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-60">{saving ? <Loader /> : <Save size={18} />}{saving ? "Saving..." : "Save profile"}</button>}
    </form>
    <section className="mt-12"><div className="flex items-center justify-between mb-5"><div><h2 className="text-2xl font-bold text-slate-800">My applications</h2><p className="text-gray-500 mt-1">Track your applications and their current status.</p></div><LinkIcon className="text-[#6055FF]" size={22} /></div>{applications.length === 0 ? <div className="bg-white rounded-2xl p-6 text-gray-500 border border-slate-200">You have not applied to any jobs yet.</div> : <div className="space-y-4">{applications.map((application) => <article key={application._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><h3 className="text-lg font-bold text-slate-800">{application.job?.title || "Job no longer available"}</h3><p className="text-gray-500 mt-1">{application.job?.company?.name || "Company"}{application.job?.location ? ` · ${application.job.location}` : ""}</p></div><span className={`self-start rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[application.status] || statusStyles.pending}`}>{application.status}</span></div><div className="mt-4 flex items-center justify-between text-sm text-gray-500"><span>Applied {new Date(application.createdAt).toLocaleDateString("en-IN")}</span>{application.status === "pending" && <button type="button" onClick={() => withdrawApplication(application._id)} className="text-red-600 hover:underline">Withdraw</button>}</div></article>)}</div>}</section>
  </div></main>;
};

export default UserProfile;