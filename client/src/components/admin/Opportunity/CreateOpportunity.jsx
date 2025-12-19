import React, { useState } from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaUsers,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTimes,
  FaBuilding,
  FaHome,
  FaGlobe,
} from "react-icons/fa";
import { usePostpaidjobMutation } from "../../../features/careers/opportunitySlice";
import InternshipDropdown from "./Internshipdropdown";

const OpportunityForm = () => {
  const [postPaidJob, { isLoading, isError, isSuccess, error }] =
    usePostpaidjobMutation();

  const [view, setView] = useState("form");
  const [formData, setFormData] = useState({
    type: "job",
    title: "",
    description: "",
    about: [""],
    department: "",
    visibility: "public",
    employementType: "Full-time",
    skills: [""],
    locationType: "Remote",
    location: "",

    whoCanApply: [""],
    otherRequirements: [""],
    perks: [""],
    numberOfOpening: 1,
    lastDateToApply: "",
    startFrom: "",

    // Job Details
    jobDetails: {
      salary: "",
      responsibilities: [""],
      requirements: [""],
      internshipId: "",
      
    },

    // Course Details
    courseDetails: {
      price: "",
      durationWeeks: "",
      modules: [""],
      internshipId: "",
      
    },

    // Internship Details
    internshipDetails: {
      duration: "",
      stipendType: "unpaid",
      stipendAmount: "",
      stipendRange: {
        min: "",
        max: "",
      },
      
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNestedInputChange = (parent, child, grandchild, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: {
          ...prev[parent][child],
          [grandchild]: value,
        },
      },
    }));
  };

  const handleArrayChange = (field, index, value, parent = null) => {
    if (parent) {
      setFormData((prev) => {
        const updated = [...prev[parent][field]];
        updated[index] = value;
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [field]: updated,
          },
        };
      });
    } else {
      setFormData((prev) => {
        const updated = [...prev[field]];
        updated[index] = value;
        return {
          ...prev,
          [field]: updated,
        };
      });
    }
  };

  const addField = (field, parent = null) => {
    if (parent) {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: [...prev[parent][field], ""],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], ""],
      }));
    }
  };

  const removeField = (field, index, parent = null) => {
    if (parent) {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: prev[parent][field].filter((_, i) => i !== index),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "job":
        return <FaBriefcase className="w-5 h-5" />;
      case "course":
        return <FaGraduationCap className="w-5 h-5" />;
      case "internship":
        return <FaUsers className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getLocationIcon = (locationType) => {
    switch (locationType) {
      case "Remote":
        return <FaGlobe className="w-4 h-4" />;
      case "Onsite":
        return <FaBuilding className="w-4 h-4" />;
      case "Hybrid":
        return <FaHome className="w-4 h-4" />;
      default:
        return null;
    }
  };



  const prepareFormData = () => {
    const filteredSkills = formData.skills.filter(
      (skill) => skill.trim() !== ""
    );
    const filteredResponsibilities =
      formData.jobDetails.responsibilities.filter((resp) => resp.trim() !== "");
    const filteredRequirements = formData.jobDetails.requirements.filter(
      (req) => req.trim() !== ""
    );
    const filteredModules = formData.courseDetails.modules.filter(
      (module) => module.trim() !== ""
    );

    const filteredAbout = Array.isArray(formData.about)
      ? formData.about.filter((item) => item && item.trim() !== "")
      : formData.about && formData.about.trim() !== ""
      ? [formData.about]
      : [];

    const filteredWhoCanApply = formData.whoCanApply.filter(
      (item) => item.trim() !== ""
    );
    const filteredOtherRequirements = formData.otherRequirements.filter(
      (item) => item.trim() !== ""
    );
    const filteredPerks = formData.perks.filter((item) => item.trim() !== "");

    const submissionData = {
      type: formData.type,
      title: formData.title,
      description: formData.description,
      about: filteredAbout,
      department: formData.department,
      visibility: formData.visibility,
      employementType: formData.employementType,
      skills: filteredSkills,
      locationType: formData.locationType,
      location: formData.location,
      whoCanApply: filteredWhoCanApply,
      otherRequirements: filteredOtherRequirements,
      perks: filteredPerks,
      numberOfOpening: formData.numberOfOpening
        ? Number(formData.numberOfOpening)
        : undefined,
    };

    if (formData.type === "job") {
      submissionData.jobDetails = {
        salary: formData.jobDetails.salary
          ? formData.jobDetails.salary
          : undefined,
        responsibilities: filteredResponsibilities,
        requirements: filteredRequirements,
        internshipId: formData.jobDetails.internshipId || undefined,
      };

      delete submissionData.courseDetails;
      delete submissionData.internshipDetails;
    } else if (formData.type === "course") {
      submissionData.courseDetails = {
        price: formData.courseDetails.price
          ? Number(formData.courseDetails.price)
          : undefined,
        durationWeeks: formData.courseDetails.durationWeeks
          ? Number(formData.courseDetails.durationWeeks)
          : undefined,
        modules: filteredModules,
        internshipId: formData.courseDetails.internshipId || undefined,
      };

      delete submissionData.jobDetails;
      delete submissionData.internshipDetails;
    } else if (formData.type === "internship") {
      submissionData.internshipDetails = {
        duration: formData.internshipDetails.duration || undefined,
        stipendType: formData.internshipDetails.stipendType,
        stipendAmount: formData.internshipDetails.stipendAmount
          ? formData.internshipDetails.stipendAmount
          : undefined,
        stipendRange:
          formData.internshipDetails.stipendRange.min &&
          formData.internshipDetails.stipendRange.max
            ? {
                min: formData.internshipDetails.stipendRange.min,
                max: formData.internshipDetails.stipendRange.max,
              }
            : undefined,
        lastDateToApply:
          formData.internshipDetails.lastDateToApply || undefined,
      };

      delete submissionData.jobDetails;
      delete submissionData.courseDetails;
    }

    Object.keys(submissionData).forEach((key) => {
      if (submissionData[key] === undefined) {
        delete submissionData[key];
      }
    });

    if (submissionData.jobDetails) {
      Object.keys(submissionData.jobDetails).forEach((key) => {
        if (submissionData.jobDetails[key] === undefined) {
          delete submissionData.jobDetails[key];
        }
      });
    }

    if (submissionData.courseDetails) {
      Object.keys(submissionData.courseDetails).forEach((key) => {
        if (submissionData.courseDetails[key] === undefined) {
          delete submissionData.courseDetails[key];
        }
      });
    }

    if (submissionData.internshipDetails) {
      Object.keys(submissionData.internshipDetails).forEach((key) => {
        if (submissionData.internshipDetails[key] === undefined) {
          delete submissionData.internshipDetails[key];
        }
      });
    }

    console.log(
      "Data being sent to backend:",
      JSON.stringify(submissionData, null, 2)
    );
    return submissionData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    if (!formData.description.trim()) {
      alert("Description is required");
      return;
    }

    if (
      formData.skills.length === 0 ||
      formData.skills.every((s) => !s.trim())
    ) {
      alert("At least one skill is required");
      return;
    }

    try {
      const submissionData = prepareFormData();
      console.log("Submitting data:", submissionData);

      const result = await postPaidJob(submissionData).unwrap();

      console.log("Submission successful:", result);

      setFormData({
        type: "job",
        title: "",
        description: "",
        about: "",
        department: "",
        visibility: "public",
        employementType: "Full-time",
        skills: [""],
        locationType: "Remote",
        location: "",
        whoCanApply: [""],
        otherRequirements: [""],
        perks: [""],
        numberOfOpening: 1,
        lastDateToApply: "",
        startFrom:"",
        jobDetails: {
          salary: "",
          responsibilities: [""],
          requirements: [""],
          internshipId: "",
          
        },
        courseDetails: {
          price: "",
          durationWeeks: "",
          modules: [""],
          internshipId: "",
        },
        internshipDetails: {
          duration: "",
          stipendType: "unpaid",
          stipendAmount: "",
          stipendRange: { min: "", max: "" },
        },
      });

      alert("Opportunity created successfully!");
    } catch (err) {
      console.error("Full error object:", err);

      let errorMessage = "Failed to create opportunity";

      if (err?.data) {
        if (typeof err.data === "string") {
          errorMessage = err.data;
        } else if (err.data?.message) {
          errorMessage = err.data.message;
        } else if (err.data?.error) {
          errorMessage = err.data.error;
        } else if (Array.isArray(err.data)) {
          errorMessage = err.data.map((e) => e.msg || e).join(", ");
        }
      } else if (err?.error) {
        errorMessage = err.error;
      } else if (err?.status === 400) {
        errorMessage =
          "Bad Request: Please check all required fields are filled correctly";
      }

      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Create New Opportunity</h1>
            <h5 className="text-xl text-white mb-2 ml-52">
              Fill in the details to post a new opportunity
            </h5>
          </div>

          {isSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded m-4">
              Opportunity created successfully!
            </div>
          )}

          {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
              {error?.data?.message ||
                "Failed to create opportunity. Please try again."}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Opportunity Type
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["job", "course", "internship"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type }))}
                    className={`
                      flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                      font-medium capitalize transition-all duration-200 border-2
                      ${
                        formData.type === type
                          ? "bg-white text-blue-600 border-blue-600 shadow-md scale-105"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow"
                      }
                    `}
                  >
                    {getTypeIcon(type)}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaBriefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  Basic Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaBriefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Senior Software Engineer"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Engineering"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Brief description of the opportunity..."
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About
                </label>
                <div className="relative">
                  <FaGraduationCap className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Additional information..."
                    disabled={isLoading}
                  />
                </div>
              </div> */}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <select
                      name="employementType"
                      value={formData.employementType}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      disabled={isLoading}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility
                  </label>
                  <div className="flex gap-4">
                    {["public", "private"].map((vis) => (
                      <button
                        key={vis}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, visibility: vis }))
                        }
                        disabled={isLoading}
                        className={`
                          flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                          font-medium capitalize transition-all border
                          ${
                            formData.visibility === vis
                              ? "bg-blue-50 text-blue-600 border-blue-300"
                              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        {vis === "public" ? (
                          <FaEye className="w-4 h-4" />
                        ) : (
                          <FaEyeSlash className="w-4 h-4" />
                        )}
                        {vis}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Remote", "Onsite", "Hybrid"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            locationType: type,
                          }))
                        }
                        disabled={isLoading}
                        className={`
                          flex flex-col items-center justify-center gap-1 px-2 py-2.5 rounded-lg
                          text-sm font-medium capitalize transition-all border
                          ${
                            formData.locationType === type
                              ? "bg-blue-50 text-blue-600 border-blue-300"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        {getLocationIcon(type)}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., New York, NY"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills
                </label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <div className="relative flex-1">
                      <FaPlus className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          handleArrayChange("skills", index, e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Add a skill..."
                        disabled={isLoading}
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeField("skills", index)}
                        disabled={isLoading}
                        className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("skills")}
                  disabled={isLoading}
                  className="mt-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About (Multiple Points)
                </label>
                {(Array.isArray(formData.about)
                  ? formData.about
                  : [formData.about || ""]
                ).map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <div className="relative flex-1">
                      <FaPlus className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange("about", index, e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Add an about point..."
                        disabled={isLoading}
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeField("about", index)}
                        disabled={isLoading}
                        className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("about")}
                  disabled={isLoading}
                  className="mt-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlus className="w-4 h-4" />
                  Add About Point
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Who Can Apply
                </label>
                {formData.whoCanApply.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <div className="relative flex-1">
                      <FaUsers className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(
                            "whoCanApply",
                            index,
                            e.target.value
                          )
                        }
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Add eligibility criteria..."
                        disabled={isLoading}
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeField("whoCanApply", index)}
                        disabled={isLoading}
                        className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("whoCanApply")}
                  disabled={isLoading}
                  className="mt-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlus className="w-4 h-4" />
                  Add Eligibility Criteria
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Requirements
                </label>
                {formData.otherRequirements.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <div className="relative flex-1">
                      <FaClock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(
                            "otherRequirements",
                            index,
                            e.target.value
                          )
                        }
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Add other requirements..."
                        disabled={isLoading}
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeField("otherRequirements", index)}
                        disabled={isLoading}
                        className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("otherRequirements")}
                  disabled={isLoading}
                  className="mt-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlus className="w-4 h-4" />
                  Add Requirement
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Perks
                </label>
                {formData.perks.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <div className="relative flex-1">
                      <FaCalendarAlt className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange("perks", index, e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Add a perk..."
                        disabled={isLoading}
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeField("perks", index)}
                        disabled={isLoading}
                        className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField("perks")}
                  disabled={isLoading}
                  className="mt-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPlus className="w-4 h-4" />
                  Add Perk
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Openings
                </label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="numberOfOpening"
                    value={formData.numberOfOpening}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Number of openings"
                    min="1"
                    disabled={isLoading}
                  />
                </div>
              </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Date to Apply
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute right-3 top-3 w-4 h-4 text-gray-400 z-10" />

                    <input
                      type="date"
                      name="lastDateToApply"
                      value={formData.lastDateToApply}
                      onChange={handleInputChange}
                      className="w-full pl-16 pr-4 py-2.5 border border-gray-300 rounded-lg 
             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
             text-gray-700"
                    />
                  </div>
                </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="startFrom"
                      value={formData.startFrom}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Start Date"
                    />
                  </div>
                </div>
            </div>

            {formData.type === "job" && (
              <div className="space-y-6 pt-6 border-t border-gray-200">
                <div className="border-b border-gray-200 pb-2">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaBriefcase className="w-4 h-4 text-green-600" />
                    </div>
                    Job Details
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary
                  </label>
                  <div className="relative">
                    <FaRupeeSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      type="text"
                      name="jobDetails.salary"
                      value={formData.jobDetails.salary}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Annual salary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Responsibilities
                  </label>
                  {formData.jobDetails.responsibilities.map((resp, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <div className="relative flex-1">
                        <FaPlus className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) =>
                            handleArrayChange(
                              "responsibilities",
                              index,
                              e.target.value,
                              "jobDetails"
                            )
                          }
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Add a responsibility..."
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeField("responsibilities", index, "jobDetails")
                          }
                          className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("responsibilities", "jobDetails")}
                    className="mt-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    Add Responsibility
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements
                  </label>
                  {formData.jobDetails.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <div className="relative flex-1">
                        <FaPlus className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={req}
                          onChange={(e) =>
                            handleArrayChange(
                              "requirements",
                              index,
                              e.target.value,
                              "jobDetails"
                            )
                          }
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Add a requirement..."
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeField("requirements", index, "jobDetails")
                          }
                          className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("requirements", "jobDetails")}
                    className="mt-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    Add Requirement
                  </button>
                </div>

               
              </div>
            )}

            {formData.type === "course" && (
              <div className="space-y-6 pt-6 border-t border-gray-200">
                <div className="border-b border-gray-200 pb-2">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FaGraduationCap className="w-4 h-4 text-purple-600" />
                    </div>
                    Course Details
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Price
                    </label>
                    <div className="relative">
                      <FaRupeeSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="courseDetails.price"
                        value={formData.courseDetails.price}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Course fee"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (Weeks)
                    </label>
                    <div className="relative">
                      <FaClock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="courseDetails.durationWeeks"
                        value={formData.courseDetails.durationWeeks}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Number of weeks"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Modules
                  </label>
                  {formData.courseDetails.modules.map((module, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <div className="relative flex-1">
                        <FaPlus className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={module}
                          onChange={(e) =>
                            handleArrayChange(
                              "modules",
                              index,
                              e.target.value,
                              "courseDetails"
                            )
                          }
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Add a module..."
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeField("modules", index, "courseDetails")
                          }
                          className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("modules", "courseDetails")}
                    className="mt-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    Add Module
                  </button>
                </div>

                <div>
                  <div className="relative">
                     <InternshipDropdown
                  name="courseDetails.internshipId"
                  value={formData.courseDetails.internshipId}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Internship ID"
                  disabled={isLoading}
                />
                  </div>
                </div>
              </div>
            )}

            {formData.type === "internship" && (
              <div className="space-y-6 pt-6 border-t border-gray-200">
                <div className="border-b border-gray-200 pb-2">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FaUsers className="w-4 h-4 text-orange-600" />
                    </div>
                    Internship Details
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <div className="relative">
                      <FaClock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="internshipDetails.duration"
                        value={formData.internshipDetails.duration}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="e.g., 3 months"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stipend Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["unpaid", "fixed", "range"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            internshipDetails: {
                              ...prev.internshipDetails,
                              stipendType: type,
                            },
                          }))
                        }
                        className={`
                          px-4 py-2.5 rounded-lg font-medium capitalize transition-all border
                          ${
                            formData.internshipDetails.stipendType === type
                              ? "bg-orange-50 text-orange-600 border-orange-300"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                          }
                        `}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.internshipDetails.stipendType === "fixed" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stipend Amount
                    </label>
                    <div className="relative">
                      <FaRupeeSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="internshipDetails.stipendAmount"
                        value={formData.internshipDetails.stipendAmount}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Monthly stipend"
                      />
                    </div>
                  </div>
                )}

                {formData.internshipDetails.stipendType === "range" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Stipend
                      </label>
                      <div className="relative">
                        <FaRupeeSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.internshipDetails.stipendRange.min}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "internshipDetails",
                              "stipendRange",
                              "min",
                              e.target.value
                            )
                          }
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Minimum amount"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Stipend
                      </label>
                      <div className="relative">
                        <FaRupeeSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.internshipDetails.stipendRange.max}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "internshipDetails",
                              "stipendRange",
                              "max",
                              e.target.value
                            )
                          }
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Maximum amount"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  console.log("Save as draft:", prepareFormData());
                  alert("Draft saved!");
                }}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  "Publish Opportunity"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpportunityForm;
