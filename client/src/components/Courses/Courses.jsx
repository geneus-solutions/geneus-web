import React, { useState } from "react";
// import axios from "axios";
import img1 from "../../assets/banner.jpeg";
import "./Course.css";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useCourcesQuery } from "../../features/cources/courceApiSlice";

const Course = ({ searchResults }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const { data: courses /*, error, isLoading*/ } = useCourcesQuery();

  const handleDropdownChange = (event) => {
    setSelectedOption(event?.target?.value);
  };

  const filteredCourses = courses?.filter((course) => {
    if (selectedOption === "beginner") {
      return course.level === "beginner";
    } else if (selectedOption === "intermediate") {
      return course.level === "intermediate";
    } else if (selectedOption === "advanced") {
      return course.level === "advanced";
    }
    return true;
  });

  const beginnerCourses = filteredCourses?.filter(
    (course) => course.level === "beginner" && course.enabled === true
  );
  const intermediateCourses = filteredCourses?.filter(
    (course) => course.level === "intermediate" && course.enabled === true
  );
  const advancedCourses = filteredCourses?.filter(
    (course) => course.level === "advanced" && course.enabled === true
  );

  return (
    <div>
      <div style={{ position: "relative", width: "100vw", height: "60vh" }}>
        <img
          src={img1}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt="Contact Banner"
        />
        {/* Overlay now only covers the image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(124, 166, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "white", fontSize: "3rem" }}>Cources</h1>
        </div>
      </div>
      <div className="dropdown">
        <MDBDropdown>
          <MDBDropdownToggle color="info">
            {selectedOption || "Categories"}
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem
              link
              childTag="button"
              onClick={() =>
                handleDropdownChange({
                  target: { value: "beginner" },
                })
              }
            >
              Beginner
            </MDBDropdownItem>
            <MDBDropdownItem
              link
              childTag="button"
              onClick={() =>
                handleDropdownChange({
                  target: { value: "intermediate" },
                })
              }
            >
              Intermediate
            </MDBDropdownItem>
            <MDBDropdownItem
              link
              childTag="button"
              onClick={() =>
                handleDropdownChange({
                  target: { value: "advanced" },
                })
              }
            >
              Advanced
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>

      <MDBRow className="row-cols-1 row-cols-md-4 g-4 mx-5 mb-4 mt-1">
        {(searchResults?.length > 0
          ? searchResults
          : selectedOption === "beginner"
          ? beginnerCourses
          : selectedOption === "intermediate"
          ? intermediateCourses
          : selectedOption === "advanced"
          ? advancedCourses
          : courses?.filter((course) => course?.enabled === true)
        )?.map((course) => (
          <MDBCol key={course?.id}>
            <MDBCard className="h-100">
              <MDBCardImage
                src={course?.img}
                alt={course?.title}
                position="top"
                referrerPolicy="no-referrer"
              />
              <MDBCardBody>
                <MDBCardTitle>{course?.title}</MDBCardTitle>
                <div className="d-flex flex-row justify-content-between">
                  <div className="text-danger mb-1 me-2">
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                    <MDBIcon fas icon="star" />
                    <MDBIcon far icon="star" />
                  </div>
                </div>
                <h6 className="mb-1">
                  <s>&#8377;{course?.price}</s>
                  <strong className="ms-2 text-danger">
                    &#8377;{course?.discount_price}
                  </strong>
                </h6>
                <div className="text-center">
                  <Link to={`/course/${course?._id}`}>
                    <MDBBtn>Buy Now</MDBBtn>
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};

export default Course;
