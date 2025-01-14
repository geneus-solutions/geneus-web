import React from 'react'
import img1 from "../../assets/popularCourse_01.png";
import img2 from "../../assets/popularCourse_02.jpg";
import img3 from "../../assets/popularCourse_03.jpg";
import CourseCard from '../CourseCard/CourseCard'

function PopularCourse() {
  // Array of popular courses
  const courses = [
    {
      title: "HTML/ CSS/ JavaScript",
      image: img1,
      duration: "45h",
      description: " Master HTML, CSS, and JavaScript to build the foundational structure, design visually appealing and responsive web pages, and add dynamic functionality, excelling in modern web development. "
    },
    {
      title: "React Js Development",
      image: img2,
      duration: "30h",
      description: "Learn React Js to create cool and interactive user interfaces, and become a modern web development pro. With React Js, you can build awesome and responsive web applications easily. Mastering it will help you tackle any front-end project with confidence."
    },
    {
      title: "MERN Stack Development",
      image: img3,
      duration: "50h",
      description: "Master MongoDB, Express.js, React, and Node.js to create full-stack web applications that are powerful, dynamic, and modern. Dive into the world of web development and watch your skills soar to new heights."
    },
    
  ];

  return (
    <div className='container' style={{ padding: '20px' }}>
      {/* Title Section */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ marginRight: '10px', fontSize: '24px' }}>Popular Courses</h1>
        <div className="line" style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            className="line1"
            style={{
              width: '150px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
              marginBottom: '5px',
            }}
          ></div>
          <div
            className="line1"
            style={{
              width: '100px',
              height: '5px',
              backgroundColor: '#00b0ff',
              marginRight: '10px',
            }}
          ></div>
        </div>
      </div>

      {/* Course Cards Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            image={course.image}
            duration={course.duration}
            description={course.description}
          />
        ))}
      </div>
    </div>
  )
}

export default PopularCourse
