import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const NotFound = () => (
  <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
    <Seo title="Page Not Found" description="The page you are looking for does not exist on AbhiJob." noindex />
    <p className="text-[#6055FF] font-semibold">404</p>
    <h1 className="text-4xl font-bold mt-2">Page not found</h1>
    <p className="text-gray-500 mt-3">The page you are looking for doesn't exist or has been moved.</p>
    <div className="flex gap-4 mt-8">
      <Link to="/" className="bg-[#6055FF] text-white px-6 py-3 rounded-xl">Go to Home</Link>
      <Link to="/jobs" className="border border-[#6055FF] text-[#6055FF] px-6 py-3 rounded-xl">Browse Jobs</Link>
    </div>
  </main>
);

export default NotFound;
