import React from 'react'
import img1 from "../../assets/download.jpeg"
import CourseCard from '../CourseCard/CourseCard'

function PopularCourse() {
  // Array of popular courses
  const courses = [
    {
      title: "MERN Stack Development",
      image: img1,
      duration: "45h",
      description: "Master the MERN stack to build full-stack web applications and excel in modern web development."
    },
    {
      title: "React Native Development",
      image: img1,
      duration: "30h",
      description: "Learn how to build mobile apps using React Native, covering all the key concepts and practices."
    },
    {
      title: "Data Structures and Algorithms",
      image: img1,
      duration: "50h",
      description: "Master data structures and algorithms to excel in coding interviews and problem-solving."
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
