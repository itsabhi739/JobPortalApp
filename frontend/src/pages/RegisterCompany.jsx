import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Building2, UploadCloud } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const RegisterCompany = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { backendURL } = useContext(AuthContext);

  const recruiterPayload = location.state?.recruiterPayload || null;
  const initialCompanyName = location.state?.companyName || "";

  const [formData, setFormData] = useState({
    companyName: initialCompanyName,
    description: "",
    website: "",
    location: "",
    logo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const companyResponse = await axios.post(
        `${backendURL}/api/company/register`,
        {
          companyName: formData.companyName.trim(),
          description: formData.description.trim(),
          website: formData.website.trim(),
          location: formData.location.trim(),
          logo: formData.logo,
        },
      );
      const companyId = companyResponse.data.companyId;

      if (!companyResponse.data.success) {
        toast.error(companyResponse.data.message || "Unable to create company");
        setIsSubmitting(false);
        return;
      }

      if (recruiterPayload) {
        const registerResponse = await axios.post(
          `${backendURL}/api/auth/register`,
          {
            ...recruiterPayload,
            companyId,
          },
        );
        if (registerResponse.data.success) {
          toast.success(registerResponse.data.message);
          navigate("/verify-email");
        } else {
          toast.error(registerResponse.data.message || "Registration failed");
        }
      } else {
        toast.success("Company created successfully");
        navigate("/auth");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unable to complete request";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-900 via-indigo-700 to-blue-600">
        <div className="max-w-7xl mx-auto px-8 py-14 flex justify-between items-center">
          <div>
            <p className="text-indigo-200 text-lg">Recruiter Onboarding</p>

            <h1 className="text-5xl font-bold text-white mt-2">
              Register Your Company
            </h1>

            <p className="text-indigo-100 mt-5 max-w-xl text-lg">
              Complete your company profile to start posting jobs and hiring top
              talent.
            </p>

            <button className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl">
              Continue Setup
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-80">
            <h2 className="text-white text-xl font-semibold mb-5">
              Setup Checklist
            </h2>

            <div className="space-y-4 text-indigo-100">
              <div className="flex justify-between">
                <span>Company Details</span>
                <span>○</span>
              </div>

              <div className="flex justify-between">
                <span>Logo Upload</span>
                <span>○</span>
              </div>

              <div className="flex justify-between">
                <span>Location</span>
                <span>○</span>
              </div>

              <div className="flex justify-between">
                <span>Website</span>
                <span>○</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-6xl mx-auto -mt-10 pb-12 px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Building2 className="text-indigo-700" size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Company Information</h2>
              <p className="text-gray-500">
                Fill in your company details below.
              </p>
            </div>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div>
              <h3 className="text-xl font-semibold border-l-4 border-indigo-600 pl-3 mb-6">
                Basic Information
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full mt-2 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Google"
                  />
                </div>

                <div>
                  <label className="font-medium">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full mt-2 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="https://company.com"
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-xl font-semibold border-l-4 border-indigo-600 pl-3 mb-6">
                Company Details
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">Location</label>

                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full mt-2 border rounded-xl p-3"
                  >
                    <option value="">Select Location</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium">Industry</label>

                  <select className="w-full mt-2 border rounded-xl p-3">
                    <option>Select Industry</option>
                    <option>Software</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>E-commerce</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium">Company Size</label>

                  <select className="w-full mt-2 border rounded-xl p-3">
                    <option>Select Size</option>
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>201-500</option>
                    <option>500+</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium">Company Logo</label>

                  <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-xl h-36 cursor-pointer hover:bg-indigo-50 transition">
                    <UploadCloud size={35} className="text-indigo-600" />
                    <p className="text-gray-500 mt-2">Upload Logo</p>

                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold border-l-4 border-indigo-600 pl-3 mb-6">
                About Company
              </h3>

              <textarea
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Tell candidates about your company..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="border border-indigo-600 text-indigo-700 px-8 py-3 rounded-xl hover:bg-indigo-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {isSubmitting ? "Please wait..." : "Register Company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
