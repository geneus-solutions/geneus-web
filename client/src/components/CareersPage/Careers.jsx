import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gojeklogo from "../../assets/gojek-logo.webp";
import gopaylogo from "../../assets/gopay-logo.png";
import ovologo from "../../assets/ovo-logo.png";
import {
  ArrowUpRightIcon,
  MapPinIcon,
  ClockIcon,
  XMarkIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import "./Careers.css";

import { useGetopportunitiesQuery } from "../../features/careers/opportunitySlice";
import { useState } from "react";

const Careers = () => {
  const navigate = useNavigate();

  const { data: jobsData, isLoading, isError } = useGetopportunitiesQuery();

  const jobs = Array.isArray(jobsData?.opportunities)
    ? jobsData.opportunities
    : [];

  const [activeCategory, setActiveCategory] = React.useState("All");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [shareMenu, setShareMenu] = useState(false);

  const categories = [
    "All",
    "Job",
    "Internship",
    "Marketing",
    "Customer Service",
    "Operations",
  ];

  const filteredJobs =
    activeCategory === "All"
      ? jobs
      : jobs.filter(
          (job) =>
            job.department === activeCategory ||
            job.type.toLowerCase() === activeCategory.toLowerCase()
        );

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: i * 0.15,
      },
    }),
  };

  const categoryVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    navigate(`/careers?job=${encodeURIComponent(job.title)}`, {
      replace: false,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  useEffect(() => {
    if (jobsData) {
      console.log("Jobs data received:", jobsData);
      console.log("Number of jobs:", jobs.length);
    }
  }, [jobsData, jobs]);

  return (
    <div className="careers-page">
      <div className="hiring-banner">
        <motion.button
          className="hiring-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          We're hiring
        </motion.button>
      </div>

      <div className="careers-header text-center">
        <motion.h1
          className="careers-title"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Be part of our mission
        </motion.h1>
        <motion.p
          className="careers-subtitle"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          We're looking for passionate people to join us on our mission. We
          value flat hierarchies, clear communication, and full ownership and
          responsibility.
        </motion.p>
      </div>

      <div className="category-filters">
        <div className="filters-container">
          <motion.button
            className="view-all-btn"
            onClick={() => setActiveCategory("All")}
            variants={categoryVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            View all
          </motion.button>

          {categories
            .filter((cat) => cat !== "All")
            .map((category) => (
              <motion.button
                key={category}
                className={`filter-btn ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
                variants={categoryVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                style={{
                  backgroundColor:
                    activeCategory === category ? "black" : "transparent",
                  color: activeCategory === category ? "white" : "black",
                }}
              >
                {category}
              </motion.button>
            ))}
        </div>
      </div>

      <section className="max-w-4xl mx-auto mt-10 px-6 divide-y divide-gray-200 relative z-10">
        {isLoading && (
          <p className="text-center py-10 text-gray-500">
            Loading job opportunities...
          </p>
        )}
        {isError && (
          <p className="text-center py-10 text-red-500">
            Failed to load job opportunities. Please try again later.
          </p>
        )}

        {!isLoading && filteredJobs.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            {activeCategory === "All"
              ? "No job opportunities available at the moment."
              : `No job opportunities in ${activeCategory}.`}
          </p>
        )}

        {filteredJobs.map((job, index) => (
          <motion.div
            key={job._id || job.id || index}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-between items-center py-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                {job.title || "Untitled Position"}
              </h3>
              <p className="text-gray-600 mb-3">
                {job.desc || job.description || "No description available"}
              </p>
              <div className="flex gap-3 text-sm text-gray-700">
                {job.location && (
                  <span className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                    <MapPinIcon className="w-4 h-4" /> {job.location}
                  </span>
                )}
                {job.employmentType && (
                  <span className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                    <ClockIcon className="w-4 h-4" /> {job.employmentType}
                  </span>
                )}
                {job.department && (
                  <span className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
                    {job.department}
                  </span>
                )}
              </div>
            </div>
            <motion.button
              whileHover={{ x: 3 }}
              className="flex items-center gap-1 text-white font-medium"
              onClick={() => handleApplyClick(job)}
            >
              Apply <ArrowUpRightIcon className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </section>

      {/* Job Popup Modal */}
      <AnimatePresence>
        {showModal && selectedJob && (
          <motion.div
            className="fixed inset-0 backdrop-blur-[2px] bg-white/30 flex items-start justify-center overflow-y-auto z-50"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl mx-auto mt-24 mb-10 p-8 relative"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{
                y: 40,
                opacity: 0,
                scale: 0.98,
                transition: { duration: 0.15 },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const shareUrl = `${
                  window.location.origin
                }/jobs/${encodeURIComponent(selectedJob.title || "job")}`;

                const handleWhatsAppShare = () => {
                  const msg = `Check out this job: ${selectedJob.title}\n\n${shareUrl}`;
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(msg)}`,
                    "_blank"
                  );
                };

                const handleEmailShare = () => {
                  const subject = `Job Opportunity: ${selectedJob.title}`;
                  const body = `Hi,\n\nCheck out this job:\n\n${selectedJob.title}\n${shareUrl}`;
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(body)}`,
                    "_blank"
                  );
                };

                return (
                  <>
                    <button
                      onClick={closeModal}
                      className="absolute top-8 right-4 p-2 text-gray-500 hover:text-gray-800"
                    >
                      <XMarkIcon
                        className="w-6 h-6"
                        style={{ color: "white" }}
                      />
                    </button>

                    <div className="w-full flex justify-center">
                      <div className="max-w-6xl w-full px-4">
                        <div className="space-y-8">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h2 className="text-3xl font-bold text-gray-900">
                                {selectedJob.title || "Untitled Position"}
                              </h2>

                              <div className="flex items-center space-x-3">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium shadow hover:bg-blue-700"
                                  onClick={() =>
                                    navigate(
                                      `/apply-job/${
                                        selectedJob._id || selectedJob.id
                                      }`,
                                      {
                                        state: {
                                          title: selectedJob.title,
                                          type: selectedJob.type,
                                        },
                                      }
                                    )
                                  }
                                >
                                  Apply Now
                                </motion.button>

                                <div className="relative">
                                  <button
                                    title="Share Job"
                                    className="p-2 rounded-full border border-gray-300"
                                    onClick={() =>
                                      setShareMenu((prev) => !prev)
                                    }
                                  >
                                    <ShareIcon
                                      className="w-5 h-5 text-gray-600"
                                      style={{ color: "white" }}
                                    />
                                  </button>

                                  {shareMenu && (
                                    <div
                                      style={{ backgroundColor: "white" }}
                                      className="absolute right-0 mt-2 border rounded-lg shadow-lg w-48 p-2 z-50"
                                    >
                                      <button
                                        className="w-full flex items-center gap-2 text-left px-3 py-2 hover:bg-gray-100 rounded"
                                        onClick={handleWhatsAppShare}
                                      >
                                        <img
                                          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                          alt="WhatsApp"
                                          className="w-5 h-5"
                                        />
                                        <span>Share on WhatsApp</span>
                                      </button>
                                      <br />

                                      <button
                                        className="w-full flex items-center gap-2 text-left px-3 py-2 hover:bg-gray-100 rounded"
                                        onClick={handleEmailShare}
                                      >
                                        <img
                                          src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
                                          alt="Gmail"
                                          className="w-5 h-5"
                                        />
                                        <span>Share on Gmail</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-4">
                              {selectedJob.description ||
                                selectedJob.desc ||
                                "No description available"}
                            </p>

                            <div className="flex flex-wrap gap-3 text-sm text-gray-700 mb-4">
                              {selectedJob.location && (
                                <span className="flex items-center gap-1 border border-black rounded-full px-3 py-1">
                                  <MapPinIcon className="w-4 h-4" />
                                  {selectedJob.location}
                                </span>
                              )}

                              {selectedJob.locationType && (
                                <span className="flex items-center gap-1 border border-black rounded-full px-3 py-1">
                                  <MapPinIcon className="w-4 h-4" />
                                  {selectedJob.locationType}
                                </span>
                              )}

                              {selectedJob.employementType && (
                                <span className="flex items-center gap-1 border border-black rounded-full px-3 py-1">
                                  <ClockIcon className="w-4 h-4" />
                                  {selectedJob.employementType}
                                </span>
                              )}

                              {selectedJob.type && (
                                <span className="flex items-center gap-1 border border-black rounded-full px-3 py-1">
                                  {selectedJob.type}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* About Section */}
                          {selectedJob.about && (
                            <div className="text-gray-700 leading-relaxed">
                              <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                About this opportunity
                              </h3>
                              {Array.isArray(selectedJob.about) ? (
                                <ul className="list-disc list-inside space-y-2">
                                  {selectedJob.about.map((item, index) => (
                                    <li key={index} className="text-gray-700">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{selectedJob.about}</p>
                              )}
                            </div>
                          )}

                          {/* Who Can Apply Section */}
                          {selectedJob.whoCanApply &&
                            selectedJob.whoCanApply.length > 0 && (
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                  Who Can Apply
                                </h3>
                                <ul className="list-disc list-inside space-y-2">
                                  {selectedJob.whoCanApply.map(
                                    (item, index) => (
                                      <li key={index} className="text-gray-700">
                                        {item}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {/* Skills Section */}
                          {selectedJob.skills &&
                            selectedJob.skills.length > 0 && (
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                  Required Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {selectedJob.skills.map((skill, index) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Other Requirements Section */}
                          {selectedJob.otherRequirements &&
                            selectedJob.otherRequirements.length > 0 && (
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                  Other Requirements
                                </h3>
                                <ul className="list-disc list-inside space-y-2">
                                  {selectedJob.otherRequirements.map(
                                    (item, index) => (
                                      <li key={index} className="text-gray-700">
                                        {item}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {/* Perks Section */}
                          {selectedJob.perks &&
                            selectedJob.perks.length > 0 && (
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                  Perks
                                </h3>
                                <ul className="list-disc list-inside space-y-2">
                                  {selectedJob.perks.map((perk, index) => (
                                    <li key={index} className="text-gray-700">
                                      {perk}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {/* Job/Internship Specific Details */}
                          {selectedJob.type === "job" &&
                            selectedJob.jobDetails && (
                              <div className="space-y-6">
                                <div>
                                  <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                    Job Details
                                  </h3>

                                  {selectedJob.jobDetails.salary && (
                                    <div className="mb-3">
                                      <span className="font-semibold">
                                        Salary:{" "}
                                      </span>
                                      ₹
                                      {selectedJob.jobDetails.salary.toLocaleString()}
                                    </div>
                                  )}

                                  {selectedJob.jobDetails.responsibilities &&
                                    selectedJob.jobDetails.responsibilities
                                      .length > 0 && (
                                      <div>
                                        <h4 className="font-medium text-gray-800 mb-2">
                                          Responsibilities:
                                        </h4>
                                        <ul className="list-disc list-inside space-y-1">
                                          {selectedJob.jobDetails.responsibilities.map(
                                            (resp, index) => (
                                              <li
                                                key={index}
                                                className="text-gray-700"
                                              >
                                                {resp}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}

                                  {selectedJob.jobDetails.requirements &&
                                    selectedJob.jobDetails.requirements.length >
                                      0 && (
                                      <div className="mt-4">
                                        <h4 className="font-medium text-gray-800 mb-2">
                                          Requirements:
                                        </h4>
                                        <ul className="list-disc list-inside space-y-1">
                                          {selectedJob.jobDetails.requirements.map(
                                            (req, index) => (
                                              <li
                                                key={index}
                                                className="text-gray-700"
                                              >
                                                {req}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}

                          {selectedJob.type === "internship" &&
                            selectedJob.internshipDetails && (
                              <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                  Internship Details
                                </h3>

                                {selectedJob.internshipDetails.duration && (
                                  <div>
                                    <span className="font-semibold">
                                      Duration:{" "}
                                    </span>
                                    {selectedJob.internshipDetails.duration}
                                  </div>
                                )}

                                {selectedJob.internshipDetails.stipendType &&
                                  selectedJob.internshipDetails.stipendType !==
                                    "unpaid" && (
                                    <div>
                                      <span className="font-semibold">
                                        Stipend:{" "}
                                      </span>
                                      {selectedJob.internshipDetails
                                        .stipendType === "fixed"
                                        ? `₹${selectedJob.internshipDetails.stipendAmount?.toLocaleString()}/month`
                                        : selectedJob.internshipDetails
                                            .stipendType === "range"
                                        ? `₹${selectedJob.internshipDetails.stipendRange?.min?.toLocaleString()} - ₹${selectedJob.internshipDetails.stipendRange?.max?.toLocaleString()}/month`
                                        : "Unpaid"}
                                    </div>
                                  )}

                                {selectedJob.internshipDetails
                                  .lastDateToApply && (
                                  <div>
                                    <span className="font-semibold">
                                      Last Date to Apply:{" "}
                                    </span>
                                    {new Date(
                                      selectedJob.internshipDetails.lastDateToApply
                                    ).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            )}

                          {selectedJob.type === "course" &&
                            selectedJob.courseDetails && (
                              <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                  Course Details
                                </h3>

                                {selectedJob.courseDetails.price && (
                                  <div>
                                    <span className="font-semibold">
                                      Price:{" "}
                                    </span>
                                    ₹
                                    {selectedJob.courseDetails.price.toLocaleString()}
                                  </div>
                                )}

                                {selectedJob.courseDetails.durationWeeks && (
                                  <div>
                                    <span className="font-semibold">
                                      Duration:{" "}
                                    </span>
                                    {selectedJob.courseDetails.durationWeeks}{" "}
                                    weeks
                                  </div>
                                )}

                                {selectedJob.courseDetails.modules &&
                                  selectedJob.courseDetails.modules.length >
                                    0 && (
                                    <div>
                                      <h4 className="font-medium text-gray-800 mb-2">
                                        Course Modules:
                                      </h4>
                                      <ul className="list-disc list-inside space-y-1">
                                        {selectedJob.courseDetails.modules.map(
                                          (module, index) => (
                                            <li
                                              key={index}
                                              className="text-gray-700"
                                            >
                                              {module}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                {selectedJob.courseDetails.internshipId && (
                                  <div className="mt-4">
                                    <h4 className="font-medium text-gray-800 mb-2">
                                      Internship ID:
                                    </h4>
                                    <p className="text-gray-700">
                                      {selectedJob.courseDetails.internshipId}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}

                          {/* Number of Openings */}
                          {selectedJob.numberOfOpening && (
                            <div className="pt-4 border-t border-gray-200">
                              <span className="font-semibold">
                                Number of Openings:{" "}
                              </span>
                              {selectedJob.numberOfOpening}
                            </div>
                          )}

                          {/* Posted Date */}
                          {selectedJob.createdAt && (
                            <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                              <span className="font-semibold">Posted on: </span>
                              {new Date(
                                selectedJob.createdAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center py-20 bg-gradient-to-b from-white to-gray-50 relative z-10"
      >
        <p className="text-2xl font-semibold text-gray-800 max-w-2xl mx-auto leading-snug">
          “We truly value work-life balance. We work hard and deliver,
          but at the end of the day you can switch off.”
        </p>
        <div className="mt-6">
          <img
            src="https://randomuser.me/api/portraits/women/75.jpg"
            alt="Testimonial"
            className="w-12 h-12 rounded-full mx-auto mb-2"
          />
          <p className="font-semibold">Frankie Sullivan</p>
          <p className="text-sm text-gray-600">Web Developer, Untitled</p>
        </div>
      </motion.section> */}

      {/* <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-100 text-black text-sm py-3 px-4 md:px-8 flex flex-wrap justify-center gap-x-4 gap-y-2 font-medium tracking-wide"
      >
        <span>Subscribe to our newsletter</span>
        <span>•</span>
        <span>How it works</span>
        <span>•</span>
        <span>Documentation</span>
        <span>•</span>
        <span>Join the community</span>
        <span>•</span>
        <span>Releases</span>
        <span>•</span>
        <span>Support</span>
      </motion.div> */}
    </div>
  );
};

export default Careers;
