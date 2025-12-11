import React, { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetJobByIdQuery } from "../../features/careers/careersSlice";
import { useApplyJobMutation } from "../../features/careers/applyJobApiSlice";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const initialFormFactory = () => ({
  name: "",
  phone: "",
  email: "",
  college: "",
  degreeBranch: "",
  currentSemester: "",
  resume: null,
});

const ApplyJobForm = ({ isMernProgram = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation() || {}; 
  const {title} = location.state || {};
 
  const {
    data: job,
    isLoading,
    isError,
  } = useGetJobByIdQuery(isMernProgram ? undefined : id, {
    skip: isMernProgram,
  });

  const initialForm = useMemo(() => initialFormFactory(), []);
  const [formData, setFormData] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [applyJob] = useApplyJobMutation();
  const validate = useCallback((data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Please enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(data.email || ""))
      errs.email = "Enter a valid email";
    if (!/^\+?\d{7,15}$/.test(data.phone || ""))
      errs.phone = "Enter a valid phone number";
    if (!data.degreeBranch.trim()) errs.degreeBranch = "Required";
    if (!data.college.trim()) errs.college = "Required";
    if (!data.currentSemester.trim()) errs.currentSemester = "Required";

    if (!data.resume) {
      errs.resume = "Upload your resume";
    } else if (!ALLOWED_TYPES.includes(data.resume.type)) {
      errs.resume = "Only PDF or DOC files allowed";
    } else if (data.resume.size > MAX_FILE_SIZE) {
      errs.resume = "File too large (max 2MB)";
    }

    return errs;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({
      ...prev,
      [name]: name === "resume" ? files?.[0] || null : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess(false);

      const errs = validate(formData);
      if (Object.keys(errs).length) {
        setFieldErrors(errs);
        setError("Please fix the highlighted fields");
        return;
      }

      const payload = new FormData();
      Object.entries({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        college: formData.college,
        degreeBranch: formData.degreeBranch,
        currentSemester: formData.currentSemester,
      }).forEach(([k, v]) => payload.append(k, v));

      payload.append("resume", formData.resume);
      payload.append("jobId", isMernProgram ? "mern-program" : id);

      try {
        setLoading(true);
        const response = await applyJob(payload).unwrap();
        if (response?.success) {
          setSuccess(true);
          setFormData(initialFormFactory());
          setFieldErrors({});
        } else {
          setError(response?.message || "Failed to submit application");
        }
      } catch (err) {
        const msg =
          err?.data?.message || err?.message || "Something went wrong";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [applyJob, formData, id, isMernProgram, validate]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-lg font-medium">Fetching job details...</p>
      </div>
    );
  }

  if (!isMernProgram && (isError || !job)) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          404
        </motion.h1>
        <p className="text-gray-600 mt-3">Job Not Found</p>
      </div>
    );
  }

  const inputs = [
    { name: "name", label: "Full Name" },
    { name: "email", label: "Email Address" },
    { name: "phone", label: "Phone Number" },
    {
      name: "degreeBranch",
      label: "Degree / Branch (e.g., BE/B.Tech / BCA / MCA / BSc)",
    },
    { name: "college", label: "College / University" },
    { name: "currentSemester", label: "Graduation Year", type: "select" },
  ];

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-12 border border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Logo Section 
  <div className="flex justify-center mb-4">
    <img
      src="/static/media/logo.e373ff51a56528f216e6.png"
      alt="Geneus Solutions"
      className="h-12 sm:h-14 object-contain"
    />
  </div>*/}

      {isMernProgram ? (
        <div className="mb-5 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900">
            MERN Full Stack Developer Training + Internship
          </h2>

          <p className="text-gray-600 mt-2 text-[15px] max-w-xl mx-auto">
            A practical, beginner-friendly MERN program with real projects,
            mentor support, and a 3-month internship letter. Ideal for freshers,
            students & job-seekers.
          </p>

          {/* Fees + Duration */}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4 text-center space-y-2">
            <p className="text-gray-700 text-sm">
              <strong className="text-gray-900">Duration:</strong> 3 Months
              (Including Internship)
            </p>

            <p className="text-gray-700 text-sm">
              <strong className="text-gray-900">Internship:</strong> FREE
              (Training fee only)
            </p>

            <div className="pt-1">
              <p className="text-gray-900 font-semibold">
                Training Fee:{" "}
                <span className="line-through text-red-500">₹7,000</span>
              </p>
              <p className="text-green-700 font-bold text-lg">
                You Pay Only: ₹3,000
              </p>
              <p className="text-xs text-green-600 font-medium">
                (Limited-Time Student Offer)
              </p>
            </div>
          </div>

          {/* ⭐ NEW — Learn More Link 
      <div className="mt-3">
        <a
          href="https://www.geneussolutions.in/course/68f9afe3e867ddc118adcfe6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium underline hover:text-blue-800 transition"
        >
          Learn More → Mern Training Topics covered
        </a>
      </div>*/}

          {/* Why Join */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left mt-6">
            <h3 className="font-semibold text-gray-800 mb-3 text-lg">
              Why Join This Program?
            </h3>
            <ul className="space-y-2 text-gray-700 text-[15px] leading-relaxed">
              <li>
                ✔ Step-by-Step MERN Stack Training (MongoDB → Express → React →
                Node)
              </li>
              <li>✔ Build a Real Industry-Level Project</li>
              <li>✔ Learn Directly from Industry Developers & Mentors</li>
              <li>✔ Course Completion Certificate</li>
              <li>✔ 3-Month Internship Letter + Weekly Evaluations</li>
              <li>✔ 100% Practical Training, Beginner Friendly</li>
              <li>✔ Mock Interviews with Detailed Feedback</li>
            </ul>
          </div>

          <div className="mt-3">
            <a
              href="https://www.geneussolutions.in/course/68f9afe3e867ddc118adcfe6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium underline hover:text-blue-800 transition"
            >
              View Full Course Topics →
            </a>
            <p className="text-xs text-gray-500 mt-1">
              (Main course page shows original fee ₹7,000. You will pay only
              ₹3,000 under the student offer.)
            </p>
          </div>

          {/* 🌱 Past Students Section */}
          <div className="bg-white border border-green-200 rounded-xl p-5 text-left mt-6 shadow-sm">
            <h3 className="font-semibold text-green-700 mb-3 text-lg">
              🌱 Our Past Students (Who Completed Internship & Later Got Jobs)
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              We feel happy to share a few of our learners who continued their
              journey and are now working in the industry:
            </p>

            <ul className="space-y-2 text-[15px]">
              <li>
                <span className="font-semibold text-gray-800">
                  1) Dipendra –{" "}
                </span>
                <a
                  href="https://www.linkedin.com/in/dipendra-kumar-bm5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View LinkedIn Profile
                </a>
              </li>

              <li>
                <span className="font-semibold text-gray-800">
                  2) Deepak –{" "}
                </span>
                <a
                  href="https://www.linkedin.com/in/deepakgupta21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View LinkedIn Profile
                </a>
              </li>

              <li>
                <span className="font-semibold text-gray-800">
                  3) Sonali –{" "}
                </span>
                <a
                  href="https://www.linkedin.com/in/sonali-kumari-114a03204/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <h2 className="text-2xl font-bold mb-6 text-center">
          Apply for : {title}
        </h2>
      )}

      {/* Informational note (visible before submission) */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 text-sm text-gray-700">
        <strong>Note:</strong> After you submit the registration form, our team
        will contact you within <b>2–5 working days</b> for the{" "}
        <b>payment & enrollment process</b> and guide you with the next steps.
      </div>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-center border border-green-300"
        >
          🎉 <b>Your application is submitted!</b>
          <br />
          Our team will reach out within <b>2–5 working days</b>.
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="text-sm" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {inputs.map((inp) => (
            <div key={inp.name}>
              <label className="block text-sm font-semibold mb-1 text-gray-800">
                {inp.label} <span className="text-red-500">*</span>
              </label>

              {inp.type === "select" ? (
                <select
                  name={inp.name}
                  value={formData[inp.name]}
                  onChange={handleChange}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-blue-300 focus:ring-2 ${
                    fieldErrors[inp.name] ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Year</option>
                  <option value="Pursuing">Pursuing</option>
                  {Array.from({ length: 29 }, (_, i) => 2001 + i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  name={inp.name}
                  onChange={handleChange}
                  value={formData[inp.name]}
                  placeholder={`Enter your ${inp.label.toLowerCase()}`}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-300 focus:ring-2 ${
                    fieldErrors[inp.name] ? "border-red-500" : ""
                  }`}
                />
              )}

              {fieldErrors[inp.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors[inp.name]}
                </p>
              )}
            </div>
          ))}

          {/* Resume */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-gray-800">
              Resume (PDF/DOC) <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-3 items-center">
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className={`flex-1 border border-gray-300 bg-white rounded-lg px-3 py-2 shadow-sm ${
                  fieldErrors.resume ? "border-red-500" : ""
                }`}
              />

              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, resume: null }));
                  setFieldErrors((prev) => ({ ...prev, resume: undefined }));
                }}
                className="text-gray-600 text-sm hover:underline"
              >
                Clear
              </button>
            </div>

            {formData.resume && (
              <p className="text-gray-600 text-xs mt-2">
                Selected: {formData.resume.name}
              </p>
            )}
            {fieldErrors.resume && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.resume}</p>
            )}
          </div>
        </div>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:underline"
          >
            ← Back
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-7 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ApplyJobForm;
