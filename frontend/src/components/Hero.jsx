import { useNavigate } from "react-router-dom";


const Hero = () => {
    const navigate = useNavigate();
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <span className="bg-blue-100 text-primary px-4 py-2 rounded-full">
            #1 Placement Portal
          </span>

          <h1 className="text-5xl font-bold mt-6 leading-tight">
            Find Your
            <span className="text-secondary"> Dream Job </span>
            Faster
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            Connect with top companies, apply for internships,
            and get placed through our smart placement platform.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl" onClick={()=>navigate('/jobs')}>
              Find Jobs
            </button>

            <button className="border px-6 py-3 rounded-lg">
              Upload Resume
            </button>
          </div>

          <div className="flex gap-10 mt-10">
            <div>
              <h3 className="text-2xl font-bold">500+</h3>
              <p>Companies</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">10K+</h3>
              <p>Students</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">2K+</h3>
              <p>Placements</p>
            </div>
          </div>
        </div>

        <div>
          <img src="https://imgs.search.brave.com/aCibjpLseejKFW1zWGlMJrDOhUdiN2LxxvdhVRYfdCw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbGFj/cml0eXMuaW4vd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMTIv/Q29uc3VsdGluZy1E/ZXNpZ24tUHJvZmVz/c2lvbmFscy1mb3It/T2ZmaWNlLVdhbGxw/YXBlci53ZWJw" alt="" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;