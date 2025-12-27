import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams  } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import "./Careers.css";

import { useGetopportunitiesQuery } from "../../features/careers/opportunitySlice";
import JobPopup from "./JobPopup";

const Careers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobIdFromUrl = searchParams.get("jobId");

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
    console.log("Selected job:", job);
    setShowModal(true);
    navigate(`/careers?jobId=${job._id}`, {
      replace: false,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    navigate("/careers", { replace: true});
  };

  useEffect(() => {

    if(!jobIdFromUrl || !jobs.length) return;

    const matchedJob = jobs.find((job) => job._id === jobIdFromUrl);

    if(matchedJob) {
      setSelectedJob(matchedJob);
      setShowModal(true);
    }
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
              <p className="text-gray-600 mb-3 mr-5 text-md">
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

      <JobPopup
        showModal={showModal}
        selectedJob={selectedJob}
        closeModal={closeModal}
        shareMenu={shareMenu}
        setShareMenu={setShareMenu}
      />
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
