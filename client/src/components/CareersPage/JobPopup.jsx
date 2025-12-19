import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaRupeeSign } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPinIcon,
  ClockIcon,
  XMarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const JobPopup = ({
  showModal,
  selectedJob,
  closeModal,
  shareMenu,
  setShareMenu,
}) => {
  const navigate = useNavigate();

  if (!showModal || !selectedJob) return null;

  const shareUrl = `${window.location.origin}/jobs/${encodeURIComponent(
    selectedJob.title || "job"
  )}`;

  const handleWhatsAppShare = () => {
    const msg = `Check out this job: ${selectedJob.title}\n\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
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
                  <button
                    onClick={closeModal}
                    className="absolute top-8 right-4 p-2 text-gray-500 hover:text-gray-800"
                  >
                    <XMarkIcon className="w-6 h-6" style={{ color: "white" }} />
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
                                  onClick={() => setShareMenu((prev) => !prev)}
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

                          <p className="text-gray-600 mb-4 text-lg">
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
                                  <li key={index} className="text-gray-700 text-lg">
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
                                {selectedJob.whoCanApply.map((item, index) => (
                                  <li key={index} className="text-gray-700 text-lg">
                                    {item}
                                  </li>
                                ))}
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
                                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-lg font-medium"
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
                                    <li key={index} className="text-gray-700 text-lg">
                                      {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {/* Perks Section */}
                        {selectedJob.perks && selectedJob.perks.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-3">
                              Perks
                            </h3>
                            <ul className="list-disc list-inside space-y-2">
                              {selectedJob.perks.map((perk, index) => (
                                <li key={index} className="text-gray-700 text-lg">
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
                                  <span className="font-semibold">Price: </span>
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
                                            className="text-gray-700 text-lg"
                                          >
                                            {module}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                                <br />
                              {/* Internship Details Section */}
                              {selectedJob.courseDetails.internshipId && (
                                <div>
                                  <h2 className="font-semibold text-gray-900 mb-3">
                                    Internship Details
                                  </h2>

                                  {/* Internship Title and Description */}
                                  {selectedJob.courseDetails.internshipId
                                    .title && (
                                    <div className="mb-3">
                                      <h6 className="font-medium text-gray-800 mb-1">
                                        {
                                          selectedJob.courseDetails.internshipId
                                            .title
                                        }
                                      </h6><br />
                                      {selectedJob.courseDetails.internshipId
                                        .description && (
                                        <p className="text-gray-600 text-lg">
                                          {
                                            selectedJob.courseDetails
                                              .internshipId.description
                                          }
                                        </p>
                                      )}
                                    </div>
                                  )}

                                  {/* Internship Details Grid */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                    {/* Duration */}
                                    {selectedJob.courseDetails.internshipId
                                      .internshipDetails?.duration && (
                                      <div className="flex items-center gap-2">
                                        <ClockIcon className="w-4 h-4 text-gray-500" />
                                        <div>
                                          <span className="font-medium text-lg">
                                            Duration:{" "}
                                          </span>
                                          <span className="text-gray-700">
                                            {
                                              selectedJob.courseDetails
                                                .internshipId.internshipDetails
                                                .duration
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    {/* Stipend */}
                                    {selectedJob.courseDetails.internshipId
                                      .internshipDetails?.stipendType && (
                                      <div className="flex items-center gap-2">
                                        <FaRupeeSign className="w-4 h-4 text-gray-500" />
                                        <div>
                                          <span className="font-medium text-lg">
                                            Stipend:{" "}
                                          </span>
                                          <span className="text-gray-700">
                                            {selectedJob.courseDetails
                                              .internshipId.internshipDetails
                                              .stipendType === "fixed"
                                              ? `₹${selectedJob.courseDetails.internshipId.internshipDetails.stipendAmount?.toLocaleString()}/month`
                                              : selectedJob.courseDetails
                                                  .internshipId
                                                  .internshipDetails
                                                  .stipendType === "range"
                                              ? `₹${selectedJob.courseDetails.internshipId.internshipDetails.stipendRange?.min?.toLocaleString()} - ₹${selectedJob.courseDetails.internshipId.internshipDetails.stipendRange?.max?.toLocaleString()}/month`
                                              : "Unpaid"}
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    {/* Location */}
                                    {selectedJob.courseDetails.internshipId
                                      .location && (
                                      <div className="flex items-center gap-2">
                                        <MapPinIcon className="w-4 h-4 text-gray-500" />
                                        <div>
                                          <span className="font-medium text-lg">
                                            Location:{" "}
                                          </span>
                                          <span className="text-gray-700">
                                            {
                                              selectedJob.courseDetails
                                                .internshipId.location
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    {/* Employment Type */}
                                    {selectedJob.courseDetails.internshipId
                                      .employementType && (
                                      <div className="flex items-center gap-2">
                                        <FaBriefcase className="w-4 h-4 text-gray-500" />
                                        <div>
                                          <span className="font-medium text-lg">
                                            Type:{" "}
                                          </span>
                                          <span className="text-gray-700">
                                            {
                                              selectedJob.courseDetails
                                                .internshipId.employementType
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Internship Skills */}
                                  {selectedJob.courseDetails.internshipId
                                    .skills &&
                                    selectedJob.courseDetails.internshipId
                                      .skills.length > 0 && (
                                      <div className="mt-4">
                                        <h5 className="font-medium text-gray-800 mb-2">
                                          Skills Required:
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedJob.courseDetails.internshipId.skills.map(
                                            (skill, index) => (
                                              <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-lg font-medium"
                                              >
                                                {skill}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}

                                  {/* Internship About */}
                                  {selectedJob.courseDetails.internshipId
                                    .about &&
                                    selectedJob.courseDetails.internshipId.about
                                      .length > 0 && (
                                      <div className="mt-4">
                                        <h5 className="font-medium text-gray-800 mb-2">
                                          About Internship:
                                        </h5>
                                        <ul className="list-disc list-inside space-y-1 text-lg text-gray-700">
                                          {selectedJob.courseDetails.internshipId.about.map(
                                            (item, index) => (
                                              <li key={index}>{item}</li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}

                                  {/* Perks */}
                                  {selectedJob.courseDetails.internshipId
                                    .perks &&
                                    selectedJob.courseDetails.internshipId.perks
                                      .length > 0 && (
                                      <div className="mt-4">
                                        <h5 className="font-medium text-gray-800 mb-2">
                                          Perks:
                                        </h5>
                                        <ul className="list-disc list-inside space-y-1 text-lg text-gray-700">
                                          {selectedJob.courseDetails.internshipId.perks.map(
                                            (perk, index) => (
                                              <li key={index}>{perk}</li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    )}
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
                            {new Date(selectedJob.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobPopup;
