const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-8">

          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              PlacementPortal
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
              <li><a href="/">Home</a></li>
              <li><a href="/jobs">Jobs</a></li>
              <li><a href="/companies">Companies</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              For Students
            </h3>

            <ul className="space-y-2">
              <li>Browse Jobs</li>
              <li>Upload Resume</li>
              <li>Track Applications</li>
              <li>Career Guidance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>

            <ul className="space-y-2">
              <li>Email: support@placementportal.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Bangalore, India</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} PlacementPortal. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;