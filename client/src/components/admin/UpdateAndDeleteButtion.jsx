import React from 'react';
import './UpdateAndDeleteButton.css';
import { useNavigate } from 'react-router-dom';

const UpdateAndDeleteButtion = ({courseData}) => {
  const navigate = useNavigate();
  const handleUpdateCourse = (courseId) => {
    console.log('this is courseId', courseId)
    navigate('/add-course', { state: { courseData }});
  }
  return (
    <div className='update-delete-button-container'>
      <button className='update-course-button' onClick={()=>handleUpdateCourse(courseData._id)}>Update Course</button>
      <button className='delete-course-button'>Delete Course</button>
    </div>
  )
}



export default UpdateAndDeleteButtion;
