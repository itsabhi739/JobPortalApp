import { useNavigate } from "react-router-dom";

const assetUrl = (asset) => asset?.startsWith("http") ? asset : asset ? `${import.meta.env.VITE_BACKEND_URL}${asset}` : "";

const TopApplicants = ({ applications = [] }) => {
  const navigate = useNavigate();
  const seenApplicants = new Set();
  const recentApplicants = applications.filter((application) => {
    const applicantId = application.applicant?._id;
    if (!applicantId || seenApplicants.has(applicantId)) return false;
    seenApplicants.add(applicantId);
    return true;
  }).slice(0, 4);

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Recent Applicants
          </h2>

          <p className="text-gray-500 text-sm">
            Candidates who recently applied
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {recentApplicants.length === 0 ? (
          <p className="py-4 text-sm text-gray-500">No applicants yet.</p>
        ) : recentApplicants.map((application) => (
          <div
            key={application._id}
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-2xl transition"
          >
            <div className="flex items-center gap-3">
              {application.applicant.profile?.profilePhoto ? (
                <img
                  src={assetUrl(application.applicant.profile.profilePhoto)}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 text-[#6055FF] flex items-center justify-center font-semibold">
                  {application.applicant.username?.[0]?.toUpperCase() || "?"}
                </div>
              )}

              <div>

                <h3 className="font-semibold text-gray-800">
                  {application.applicant.username || "Student"}
                </h3>

                <p className="text-gray-500 text-sm">
                  {application.job?.title || "Job"}
                </p>

                <p className="text-xs text-gray-400">
                  {application.status || "pending"}
                </p>

              </div>

            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate(`/applicant/${application.applicant._id}`)}
                className="text-sm bg-[#6055FF] hover:bg-[#434EC1] text-white px-3 py-1.5 rounded-lg"
              >
                View
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default TopApplicants;