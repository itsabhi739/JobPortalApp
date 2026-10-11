import { useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  FileText,
  MessageSquare,
  HelpCircle,
  Building2,
  Headphones,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionError, setSubmissionError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubmissionMessage("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmissionMessage("");

    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.post(`${backendURL}/api/contact`, formData);
      setSubmissionError(false);
      setSubmissionMessage(data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmissionError(true);
      setSubmissionMessage(
        error.response?.data?.message || "Unable to send your message right now. Please try again later."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <section className="relative min-h-86 bg-linear-to-br from-[#1E246D] via-[#2F368C] to-[#5365E8] text-white overflow-hidden py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-bold">Get in Touch With Us</h1>

            <p className="mt-4 text-lg text-gray-200">
              Have a question or need help? Our team is here to support you.
            </p>
            </div>

        </section>

      <section className="relative z-10 max-w-7xl mx-auto mt-[-5cm] px-6 py-12">

        <div className="grid lg:grid-cols-3 gap-8">


          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            <h2 className="text-2xl font-bold mb-8">
              Send Us a Message
            </h2>

            {submissionMessage && (
              <p
                role="status"
                aria-live="polite"
                className={`mb-6 rounded-xl p-4 ${submissionError ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
              >
                {submissionMessage}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >


              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-gray-700">
                    Your Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                </div>


                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-gray-700">
                    Your Email <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                </div>

              </div>


              {/* Subject */}

              <div>
                <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-gray-700">
                  Subject <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <FileText
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

              </div>


              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-gray-700">
                  Your Message <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <MessageSquare
                    size={20}
                    className="absolute left-4 top-5 text-gray-400"
                  />
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={6}
                    required
                    className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-4 outline-none resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

              </div>

              <button
                type="submit"
                disabled={isSending}
                className="bg-[#F4BC19] hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60 text-black px-7 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                <Send size={19} />
                {isSending ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>


          <div>

            <h2 className="text-2xl font-bold mb-6">
              Get in Touch
            </h2>

            <div className="space-y-4">


              {/* Email */}

              <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex items-center gap-4">

                <div className="bg-indigo-100 text-indigo-700 p-3 rounded-xl">
                  <Mail size={23} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Email Us
                  </h3>

                  <p className="text-indigo-700 font-medium">
                    support@abhijob.com
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    We'll reply within 24 hours
                  </p>
                </div>

              </div>


              {/* Phone */}

              <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex items-center gap-4">

                <div className="bg-indigo-100 text-indigo-700 p-3 rounded-xl">
                  <Phone size={23} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Call Us
                  </h3>

                  <p className="text-indigo-700 font-medium">
                    +91 98765 43210
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Mon - Fri, 9:00 AM - 6:00 PM
                  </p>
                </div>

              </div>


              {/* Address */}

              <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex items-center gap-4">

                <div className="bg-indigo-100 text-indigo-700 p-3 rounded-xl">
                  <MapPin size={23} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Visit Us
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Bangalore, Karnataka
                  </p>

                  <p className="text-sm text-gray-500">
                    India
                  </p>
                </div>

              </div>


              {/* Working Hours */}

              <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 flex items-center gap-4">

                <div className="bg-indigo-100 text-indigo-700 p-3 rounded-xl">
                  <Clock size={23} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Working Hours
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Monday - Friday
                  </p>

                  <p className="text-sm text-gray-500">
                    9:00 AM - 6:00 PM IST
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= FAQ / HELP SECTION ================= */}

        <div className="mt-10 bg-white border border-gray-100 rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-3 gap-5">


            {/* Job Seekers */}

            <div className="border border-gray-200 rounded-xl p-5 flex gap-4">

              <div className="bg-indigo-100 text-indigo-700 p-3 rounded-xl h-fit">
                <HelpCircle size={23} />
              </div>

              <div>
                <h3 className="font-bold">
                  For Job Seekers
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">
                  Find answers to common questions about job applications
                  and profile management.
                </p>

                <button className="text-indigo-700 font-medium mt-3">
                  View FAQs →
                </button>
              </div>

            </div>


            {/* Recruiters */}

            <div className="border border-gray-200 rounded-xl p-5 flex gap-4">

              <div className="bg-indigo-100 text-indigo-700 p-3 rounded-xl h-fit">
                <Building2 size={23} />
              </div>

              <div>
                <h3 className="font-bold">
                  For Recruiters
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">
                  Get help with posting jobs, managing applications,
                  and company profiles.
                </p>

                <button className="text-indigo-700 font-medium mt-3">
                  View FAQs →
                </button>
              </div>

            </div>


            {/* Support */}

            <div className="border border-gray-200 rounded-xl p-5 flex gap-4">

              <div className="bg-indigo-100 text-indigo-700 p-3 rounded-xl h-fit">
                <Headphones size={23} />
              </div>

              <div>
                <h3 className="font-bold">
                  Need More Help?
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">
                  Can't find what you're looking for? Our support team
                  is here to help.
                </p>

                <button className="text-indigo-700 font-medium mt-3">
                  Contact Support →
                </button>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default ContactUs;