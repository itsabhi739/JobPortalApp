import { Link } from "react-router-dom";

const Footer = () => {
  const linkClass = "hover:text-white transition-colors";

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-8">

          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              AbhiJob
            </h2>

            <p className="mt-4 text-sm">
              Helping students connect with top companies and
              find their dream careers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li><Link className={linkClass} to="/">Home</Link></li>
              <li><Link className={linkClass} to="/jobs">Jobs</Link></li>
              <li><Link className={linkClass} to="/companies">Companies</Link></li>
              <li><Link className={linkClass} to="/contact-us">Contact</Link></li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              For Students
            </h3>

            <ul className="space-y-2">
              <li><Link className={linkClass} to="/jobs">Browse Jobs</Link></li>
              <li><Link className={linkClass} to="/profile">Upload Resume</Link></li>
              <li><Link className={linkClass} to="/my-applications">Track Applications</Link></li>
              <li><Link className={linkClass} to="/contact-us">Career Guidance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>

            <ul className="space-y-2">
              <li>Email: <a className={linkClass} href="mailto:support@abhijob.com">support@abhijob.com</a></li>
              <li>Phone: <a className={linkClass} href="tel:+919876543210">+91 98765 43210</a></li>
              <li><a className={linkClass} href="https://maps.google.com/?q=Bangalore%2C%20India" target="_blank" rel="noreferrer">Bangalore, India</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} AbhiJob. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;