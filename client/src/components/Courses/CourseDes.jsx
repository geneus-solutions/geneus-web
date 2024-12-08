import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import "./CourseDescription.css";
import { useState, useEffect } from "react";
import reactStringReplace from "react-string-replace";
import { Link } from "react-router-dom";
// import { userInfo } from "../../redux/slices/userDetails";
import { useSelector, useDispatch } from "react-redux";
// import { increment } from "../../redux/slices/cartCount";
// import { Cart } from "../../features/Cart/cartSlice";
// import { AddToCart } from "../Cart/addToCart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//import { REACT_APP_BACKEND_URL } from "../../config";

import { useAddToCartMutation } from "../../features/Cart/cartApiSlice";

const CourseDescription = ({ courseDetails }) => {
  // const [courseDetails, setCourseDetails] = useState({});
  const [discount, setDiscount] = useState(0);
  const [len, setLen] = useState(0);

  const [formattedCourseIntro, setFormattedCourseIntro] = useState("");
  const [formattedCourseIntro2, setFormattedCourseIntro2] = useState("");
  const [formattedCourseOutro, setFormattedCourseOutro] = useState("");
  const [formattedAboutCourse, setFormattedAboutCourse] = useState([]);
  const [formattedWhyCourse, setFormattedWhyCourse] = useState([]);

  // state for fetching all course contents
  const [courseContents, setcourseContents] = useState([]);

  // state for course contents
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");

  // to select content url video
  const handleVideoClick = (content) => {
    setSelectedVideoUrl(content?.url);
    setSelectedVideoTitle(content?.contentTitle);
  };

  // state for course notes
  const [courseNotes, setCourseNotes] = useState(null);

  const [courses, setCourses] = useState([]);

  // const user = useSelector(userInfo);
  const { user } = useSelector((state) => state.auth);

  const [ip, setIp] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVisitorData = async () => {
      // Check if visitor data has already been fetched in this session
      const visitorDataFetched = sessionStorage.getItem("visitorDataFetched");

      if (!visitorDataFetched) {
        try {
          const response = await fetch("http://ip-api.com/json/");
          const data = await response.json();
          if (data?.status === "success") {
            setIp(data?.query); // IP address
            setCity(data?.city); // City
            // Send visitor data to the backend
            await saveVisitorData(data?.query, data?.city);
            // Set the flag in sessionStorage to indicate that visitor data has been fetched
            sessionStorage.setItem("visitorDataFetched", "true");
          } else {
            setError("Unable to fetch location data");
          }
        } catch (err) {
          setError("Error fetching data");
          console.error(err);
        }
      }
    };

    const saveVisitorData = async (ip, city) => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/visitors`,
          {
            ip,
            city,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.error("Error saving visitor data:", err);
      }
    };

    fetchVisitorData();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL +
          "/learning?user_id=" +
          `${user?.userId}`
      );

      setCourses(response.data.courses);
    } catch (error) {
      console.error("Failed to fetch course data:", error);
    }
  };
  // fetching all course contents
  useEffect(() => {
    const fetchCourseContents = async () => {
      try {
        setcourseContents(courseDetails?.courseContent);
        // console.log(courseDetails.courseContent);
      } catch (error) {
        console.error("Error fetching course contents:", error);
      }
    };
    fetchCourseContents();
  }, [courseDetails?.courseContent]);

  // fetching all course notes
  useEffect(() => {
    const fetchCourseNotes = async () => {
      try {
        const notesUrl = courseDetails?.notes?.notesUrl;
        const notesTitle = courseDetails?.notes?.notesTitle;

        // console.log("notesUrl:", notesUrl);
        // console.log("notesTitle:", notesTitle);

        if (notesUrl !== undefined && notesTitle !== undefined) {
          setCourseNotes({
            notesUrl,
            notesTitle,
          });
        }
      } catch (error) {
        console.error("Error fetching course notes:", error);
      }
    };

    fetchCourseNotes();
  }, [courseDetails]);

  // Calculating the discount percentage dynamically
  useEffect(() => {
    if (courseDetails) {
      const calculateDiscount = () => {
        const p = courseDetails && courseDetails?.price;
        const dp = courseDetails && courseDetails?.discount_price;
        setDiscount(Number(((p - dp) / p) * 100));
      };
      const calculateLength = () => {
        const lenth = courseDetails && courseDetails?.learnings?.length;
        let halfLen = Math.ceil(lenth / 2);
        setLen(halfLen);
      };
      calculateDiscount();
      calculateLength();
    }
  }, [courseDetails, len]);

  useEffect(() => {
    const formatText = (text) => {
      const formattedText = reactStringReplace(
        text,
        /\*\*(.*?)\*\*/g,
        (match, i) => (
          <span key={i} className="bold">
            {match}
          </span>
        )
      );
      return formattedText;
    };

    if (courseDetails && courseDetails?.aboutCourse?.intro) {
      setFormattedCourseIntro(
        formatText(courseDetails && courseDetails?.aboutCourse?.intro)
      );
    }
    if (courseDetails && courseDetails?.whythisCourse?.intro) {
      setFormattedCourseIntro2(
        formatText(courseDetails && courseDetails?.whythisCourse?.intro)
      );
    }
    if (courseDetails && courseDetails?.whythisCourse?.outro) {
      setFormattedCourseOutro(
        formatText(courseDetails && courseDetails?.whythisCourse?.outro)
      );
    }
    if (courseDetails && courseDetails?.aboutCourse?.details) {
      setFormattedAboutCourse(
        courseDetails &&
          courseDetails.aboutCourse.details.map((detail) => formatText(detail))
      );
    }
    if (courseDetails && courseDetails?.whythisCourse?.details) {
      setFormattedWhyCourse(
        courseDetails &&
          courseDetails.whythisCourse.details.map((detail) =>
            formatText(detail)
          )
      );
    }
  }, [courseDetails]);

  const navigate = useNavigate();
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const dispatch = useDispatch();
  const { user: userDetail } = useSelector((state) => state.auth);

  const handleAddToCart = async () => {
    console.log("I am being called", userDetail);
    if (userDetail.id === undefined) {
      //toast.error("User is not logged in. Please Signup to add to cart");
      // console.log("user is not logged in");
      // window.location.href = "/enroll1";
      navigate("/login");
    }
    if (userDetail.id) {
      //dispatch(increment()); // not required when getting data from backend
      const course = {
        course_id: courseDetails.id,
        course_title: courseDetails.title,
        course_description: courseDetails.description,
        course_image: courseDetails.img,
        course_price: courseDetails.price,
        course_discountPrice: courseDetails.discount_price,
      };
      try {
        const ans = await addToCart({
          userId: userDetail?.id,
          courseItem: course,
        });
        console.log(ans);
        // if (ans) {
        //     // dispatch(increment());
        // }
      } catch (error) {
        console.error(error);
        toast.error("User is not logged in. Please Log in to add to cart");
        alert("Error while adding item to Cart " + error);
      }
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="g-2">
        <MDBCol md="12" lg="6">
          {/* Course image and details */}
          <MDBCardImage
            src={courseDetails && courseDetails?.img}
            alt="..."
            id="img1"
            fluid
            className="my-3 pr-3 course-image"
            style={{ height: "350px" }}
          />
        </MDBCol>
        <MDBCol md="12" lg="6">
          {/* Add to Cart button */}
          <MDBCardBody className="pb-2">
            <MDBCardTitle className="mt-2 text-dark fs-2 fw-bold colorful-title">
              {courseDetails && courseDetails?.title}
            </MDBCardTitle>
            <div className="pt-3">
              <div className="mb-1">
                <h6 className="mb-1">
                  <s>
                    &#8377;
                    {courseDetails && courseDetails?.price}
                  </s>
                  &ensp;{parseInt(discount)}% OFF
                </h6>
                <strong className="ms-2 text-danger fs-3">
                  &#8377;
                  {courseDetails && courseDetails?.discount_price}
                </strong>
              </div>
              <div>
                <Link to="#">
                  <button
                    style={{
                      display: "inline-block",
                      fontWeight: "400",
                      textAlign: "center",
                      verticalAlign: "middle",
                      userSelect: "none",
                      border: "1px solid transparent",
                      padding: "0.375rem 0.75rem",
                      fontSize: "1rem",
                      lineHeight: "1.5",
                      borderRadius: "0.25rem",
                      color: "#fff",
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                    }}
                    onClick={() => handleAddToCart(courseDetails)}
                  >
                    {" "}
                    Add to Cart{" "}
                  </button>
                </Link>
              </div>
              {/* Display Mentor Image*/}
              {courseDetails && courseDetails?.mentorImage && (
                <img
                  src={courseDetails?.mentorImage}
                  alt="Mentor"
                  className="mentor-image"
                />
              )}
            </div>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
      <MDBRow className="g-2">
        <MDBCol md="12">
          {/* What you'll learn */}
          <MDBCardBody>
            <MDBCardTitle className="mt-2 text-dark fs-4 fw-bold">
              What you'll learn
            </MDBCardTitle>
            <MDBCardText className="fs-6 fw-normal">
              <div className="div-margin">
                <div className="div1">
                  <ul className="ticks">
                    {courseDetails &&
                      courseDetails?.learnings
                        ?.slice(0, len && len)
                        .map((learning, index) => (
                          <li key={index}>{learning}</li>
                        ))}
                  </ul>
                </div>
                <div className="div2">
                  <ul className="ticks">
                    {courseDetails &&
                      courseDetails?.learnings
                        ?.slice(len && len)
                        .map((learning, index) => (
                          <li key={index}>{learning}</li>
                        ))}
                  </ul>
                </div>
              </div>
            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
      <MDBRow className="g-2">
        <MDBCol md="12" lg="4">
          <div className="content-list">
            <h2>
              <strong>Course Contents</strong>
            </h2>
            <ul className="content-ul">
              {courseContents &&
                courseContents?.map((content, index) => (
                  <li
                    key={index}
                    onClick={
                      content.contentTitle === courseContents[0].contentTitle
                        ? () => handleVideoClick(content)
                        : undefined
                    }
                    className={
                      content.contentTitle === courseContents[0].contentTitle
                        ? "content-li2"
                        : "content-li1"
                    }
                  >
                    <div
                      className="content-title"
                      style={
                        content.contentTitle === courseContents[0].contentTitle
                          ? {
                              textDecoration: "underline",
                              color: "blue",
                              cursor: "pointer",
                            }
                          : {}
                      }
                    >
                      <strong>{content.contentTitle}</strong>
                    </div>

                    <div className="content-time">{content.time}</div>
                  </li>
                ))}
            </ul>
          </div>
        </MDBCol>
        <MDBCol>
          <div className="video-player">
            <h3 className="video-title">{selectedVideoTitle}</h3>
            {selectedVideoUrl ? (
              <>
                <div className="ratio ratio-16x9">
                  <iframe
                    className="shadow-1-strong rounded"
                    src={selectedVideoUrl}
                    title="YouTube video"
                    allowFullScreen
                    data-gtm-yt-inspected-2340190_699="true"
                    id="388567449"
                    controls={0}
                  ></iframe>
                </div>
              </>
            ) : (
              <div className="start-learning-p">
                <p>Select a video to start learning!</p>
              </div>
            )}
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow className="g-2">
        <MDBCol md="12" lg="6">
          {/* Course notes */}
          <MDBCard style={{ maxWidth: "100%" }}>
            <MDBRow className="g-0">
              <MDBCol md="12">
                <MDBCardBody>
                  <MDBCardTitle className="mt-2 text-dark fs-4 fw-bold">
                    Course Notes
                  </MDBCardTitle>
                  {userDetail?.userId !== -1 && courses?.length > 0 ? (
                    <MDBCardText className="fs-6 fw-normal">
                      <div className="div-margin">
                        <div className="div1-note">
                          <div className="content-note">
                            <h2>Download Notes</h2>

                            {
                              <a
                                href={courseNotes?.notesUrl}
                                target="_blank"
                                download={courseNotes?.notesTitle} // Set the download attribute
                                rel="noopener noreferrer"
                              >
                                {courseNotes?.notesTitle}
                              </a>
                            }
                          </div>
                        </div>
                      </div>
                    </MDBCardText>
                  ) : (
                    <p>
                      &nbsp; Get the full course notes by purchasing the course
                      today
                    </p>
                  )}
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBRow className="g-2">
        <MDBCol md="12" lg="6">
          {/* Requirements */}
          <MDBCardBody>
            <MDBCardTitle className="mt-2 text-dark fs-4 fw-bold">
              Requirements
            </MDBCardTitle>
          </MDBCardBody>
          <MDBCardText className="fs-6 fw-normal requirements-text">
            <div className="div-margin">
              <ul>
                {courseDetails &&
                  courseDetails?.requirements?.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
              </ul>
            </div>
          </MDBCardText>
        </MDBCol>
      </MDBRow>
      <MDBRow className="g-2">
        <MDBCol md="12">
          {/* Description */}
          <MDBCardBody>
            <MDBCardTitle className=" mt-2 text-dark fs-4 fw-bold">
              Description
            </MDBCardTitle>
          </MDBCardBody>
          <MDBCardText className="fs-6 fw-normal">
            <div style={{ margin: "3px" }}>
              <div className="div-margin">
                <h5>
                  <b>What's this course about?</b>
                </h5>
                <p>{formattedCourseIntro && formattedCourseIntro}</p>
              </div>
              <div className="div-margin">
                <ul>
                  {formattedAboutCourse &&
                    formattedAboutCourse?.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="div-margin">
                <h5>
                  <b>
                    Why {courseDetails && courseDetails?.whythisCourse?.title}?
                  </b>
                </h5>
                <p>{formattedCourseIntro2 && formattedCourseIntro2}</p>
              </div>
              <div className="div-margin">
                <ul>
                  {formattedWhyCourse &&
                    formattedWhyCourse.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                </ul>
              </div>
            </div>
          </MDBCardText>
        </MDBCol>
      </MDBRow>
      <MDBRow className="g-2">
        <MDBCol md="12">
          {/* Who this course is for */}
          <MDBCardBody>
            <MDBCardTitle className="mt-2 text-dark fs-4 fw-bold">
              Who this course is for:
            </MDBCardTitle>
          </MDBCardBody>
          <MDBCardText className="fs-6 fw-normal">
            <div className="div-margin">
              <ul>
                {courseDetails &&
                  courseDetails?.whoitsfor?.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
              </ul>
            </div>

            <div className="div-margin">
              <p>
                {formattedCourseOutro && formattedCourseOutro}
                <br />
                <b>
                  Enroll now!!
                  <br />
                  Happy Learning
                  <br />
                  Team Geneus
                </b>
              </p>
            </div>
          </MDBCardText>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CourseDescription;
