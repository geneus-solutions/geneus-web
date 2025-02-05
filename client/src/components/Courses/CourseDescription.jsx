import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "../../features/Cart/cartApiSlice";
import { Container, Grid, Card, CardContent, Typography, Button, Link } from "@mui/material";
import reactStringReplace from "react-string-replace";
import LearningPoints from "./LearningPoints";
import CourseContent from "./CourseContent";
import CourseOtherDetails from "./CourseOtherDetails";
import Description from "./Description";
import CourseSection from "./CourseSection";
import InstructorCard from "./InstructorCard";
import DescriptionCourseCard from "./DescriptionCourseCard";

import CourseContent1 from "./CourseContent1";

const CourseDescription = ({ courseDetails }) => {

  const [discount, setDiscount] = useState(0);
  const [len, setLen] = useState(0);

  const [formattedCourseIntro, setFormattedCourseIntro] = useState("");
  const [formattedCourseIntro2, setFormattedCourseIntro2] = useState("");
  const [formattedCourseOutro, setFormattedCourseOutro] = useState("");
  const [formattedAboutCourse, setFormattedAboutCourse] = useState([]);
  const [formattedWhyCourse, setFormattedWhyCourse] = useState([]);

  // state for fetching all course contents
  const [courseContents, setcourseContents] = useState([]);

  // state for course notes
  const [courseNotes, setCourseNotes] = useState(null);

  const [courses, setCourses] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const [ip, setIp] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVisitorData = async () => {
      const visitorDataFetched = sessionStorage.getItem("visitorDataFetched");

      if (!visitorDataFetched) {
        try {
          const response = await fetch("http://ip-api.com/json/");
          const data = await response.json();
          if (data?.status === "success") {
            setIp(data?.query); // IP address
            setCity(data?.city); // City
            await saveVisitorData(data?.query, data?.city);
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
          { ip, city },
          { headers: { "Content-Type": "application/json" } }
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
        `${process.env.REACT_APP_BACKEND_URL}/learning?user_id=${user?.userId}`
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Failed to fetch course data:", error);
    }
  };

  // fetching all course contents
  useEffect(() => {
    const fetchCourseContents = async () => {
      setcourseContents(courseDetails?.courseContent);
    };
    fetchCourseContents();
  }, [courseDetails?.courseContent]);

  // fetching all course notes
  useEffect(() => {
    const fetchCourseNotes = async () => {
      const notesUrl = courseDetails?.notes?.notesUrl;
      const notesTitle = courseDetails?.notes?.notesTitle;

      if (notesUrl !== undefined && notesTitle !== undefined) {
        setCourseNotes({ notesUrl, notesTitle });
      }
    };
    fetchCourseNotes();
  }, [courseDetails]);

  useEffect(() => {
    const calculateDiscount = () => {
      const p = courseDetails?.price;
      const dp = courseDetails?.discount_price;
      setDiscount(Number(((p - dp) / p) * 100));
    };

    const calculateLength = () => {
      const length = courseDetails?.learnings?.length;
      let halfLen = Math.ceil(length / 2);
      setLen(halfLen);
    };

    if (courseDetails) {
      calculateDiscount();
      calculateLength();
    }
  }, [courseDetails]);

  useEffect(() => {
    const formatText = (text) => {
      const formattedText = reactStringReplace(
        text,
        /\*\*(.*?)\*\*/g,
        (match, i) => <span key={i} className="bold">{match}</span>
      );
      return formattedText;
    };

    if (courseDetails) {
      setFormattedCourseIntro(formatText(courseDetails?.aboutCourse?.intro));
      setFormattedCourseIntro2(formatText(courseDetails?.whythisCourse?.intro));
      setFormattedCourseOutro(formatText(courseDetails?.whythisCourse?.outro));
      setFormattedAboutCourse(
        courseDetails?.aboutCourse?.details?.map((detail) => formatText(detail))
      );
      setFormattedWhyCourse(
        courseDetails?.whythisCourse?.details?.map((detail) => formatText(detail))
      );
    }
  }, [courseDetails]);

  const [addToCart, { isLoading }] = useAddToCartMutation();
  const { user: userDetail } = useSelector((state) => state.auth);

  const handleAddToCart = async () => {
    try {
      if (userDetail?.id) {
        const course = {
          course_id: courseDetails._id,
          course_title: courseDetails.title,
          course_description: courseDetails.description,
          course_image: courseDetails.img,
          course_price: courseDetails.price,
          course_discountPrice: courseDetails.discount_price,
        };
        const ans = await addToCart({ userId: userDetail?.id, courseItem: course });
        toast.info(ans?.data?.message);
      } else {
        toast.info("Please Log in to add course to cart.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding item to cart.");
    }
  };

  return (
    <Container>
      <DescriptionCourseCard courseDetails={courseDetails} discount={discount} handleAddToCart={handleAddToCart} />
      
      {/* What you will Learn */}
      <LearningPoints title="What you will learn?" points={courseDetails?.learnings} />
      
      {/* Course Content */}
      {courseContents?.length > 0&&<CourseContent1 content={courseContents} />}

      {/* Course Notes */}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Course Notes
              </Typography>
              {userDetail?.userId !== -1 ? (
                <Typography variant="body1">
                  <Link href={courseNotes?.notesUrl} target="_blank" download={courseNotes?.notesTitle}>
                    {courseNotes?.notesTitle}
                  </Link>
                </Typography>
              ) : (
                <Typography variant="body1">Get the full course notes by purchasing the course today.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Course Requirements */}
      <CourseOtherDetails title="Requirements" requirements={courseDetails?.requirements} />

      {/* Course Description */}
      <Description
        courseIntro={formattedCourseIntro}
        aboutCourse={formattedAboutCourse}
        whyCourseTitle={courseDetails?.whythisCourse?.title}
        whyCourseIntro={formattedCourseIntro2}
        whyCourseDetails={formattedWhyCourse}
      />

      {/* Who this course is for */}
      <CourseOtherDetails title="Who this course is for" requirements={courseDetails?.whoitsfor} />

      {/* Display mentor image */}
      <InstructorCard mentorImage={courseDetails} />

      {/* Ending section */}
      <CourseSection title={formattedCourseOutro} />
    </Container>
  );
};

export default CourseDescription;
