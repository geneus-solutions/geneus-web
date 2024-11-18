import React from 'react'
import img1 from '../../assets/banner.jpeg';
import CourseCard from '../CourseCard/CourseCard';
function Courses() {
    // Array of popular courses
    const courses = [
      {
        title: "MERN Stack Development",
        image: img1,
        duration: "45h",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
    <div className='Course-banner' style={{ position: 'relative' }}>
    <div style={{ position: 'relative', width: '100vw', height: '60vh' }}>
     <img
       src={img1}
       style={{
         width: '100%',
         height: '100%',
         objectFit: 'cover',
       }}
       alt="Couse Banner"
     />
   
     <div
       style={{
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         backgroundColor: 'rgba(124, 166, 255, 0.5)',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
       }}
     >
       <h1 style={{ color: 'white', fontSize: '3rem' }}>Course</h1>
     </div>
   </div>
  <div style={{justifyContent : 'center', alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop : '20px', marginBottom : '20px' }}>
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
 </div>
  )
}

export default Courses