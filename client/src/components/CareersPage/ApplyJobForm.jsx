import React, { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    if (!/^\S+@\S+\.\S+$/.test(data.email || "")) errs.email = "Enter a valid email";
    if (!/^\+?\d{7,15}$/.test(data.phone || "")) errs.phone = "Enter a valid phone number";
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
        const msg = err?.data?.message || err?.message || "Something went wrong";
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
    { name: "degreeBranch", label: "Degree / Branch" },
    { name: "college", label: "College / University" },
    { name: "currentSemester", label: "Current Semester / Graduation Year" },
  ];

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Apply for : {isMernProgram ? "MERN Training + Internship" : job?.title}
      </h2>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center border border-green-300"
        >
          🎉 <b>Application submitted!</b>  
          <br />Our team will reach out to you within <b>2–5 days</b>.
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 text-sm" noValidate>
        {inputs.map((inp) => (
          <div key={inp.name}>
            <label className="block font-medium mb-1">
              {inp.label} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name={inp.name}
              className={`w-full border rounded-lg px-3 py-2 ${
                fieldErrors[inp.name] ? "border-red-500" : ""
              }`}
              onChange={handleChange}
              value={formData[inp.name]}
              placeholder={`Enter your ${inp.label.toLowerCase()}`}
            />
            {fieldErrors[inp.name] && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors[inp.name]}</p>
            )}
          </div>
        ))}

        {/* Resume */}
        <div>
          <label className="block font-medium mb-1">
            Resume (PDF/DOC) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className={`w-full ${fieldErrors.resume ? "border-red-500" : ""}`}
            onChange={handleChange}
          />
          {formData.resume && (
            <p className="text-sm text-gray-600 mt-1">Selected: {formData.resume.name}</p>
          )}
          {fieldErrors.resume && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.resume}</p>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            className="text-gray-600 hover:underline"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ApplyJobForm;
