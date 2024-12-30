import React, { useState } from 'react';
import './AddCourse.css';
import { useAddCourseMutation } from '../../../features/addCourse/addCourseApiSlice';

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    img: '',
    description: '',
    level: '',
    price: '',
    discount_price: '',
    duration: '',
    learnings: [''],
    requirements: [''],
    aboutCourse: { intro: '' },
    whythisCourse: { title: '', intro: '', outro: '' },
    whoitsfor: [''],
  });

  const [addCourse, { isLoading, isError, isSuccess, error }] = useAddCourseMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 1) {
      setCourse({ ...course, [name]: value });
    } else if (keys.length === 2) {
      setCourse({
        ...course,
        [keys[0]]: { ...course[keys[0]], [keys[1]]: value },
      });
    }
  };

  const handleArrayChange = (e, field, index) => {
    const updatedArray = [...course[field]];
    updatedArray[index] = e.target.value;
    setCourse({ ...course, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCourse(course).unwrap();
      alert('Course added successfully');
      console.log(response);
    } catch (error) {
      alert('Failed to add course');
      console.error(error);
    }
  };

  return (
    <div className="course-container">
      <h2 className="form-title">Add a Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={course.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input type="text" name="img" value={course.img} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={course.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Level:</label>
          <input type="text" name="level" value={course.level} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={course.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Discount Price:</label>
          <input type="number" name="discount_price" value={course.discount_price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Learnings:</label>
          {course.learnings.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, 'learnings', index)}
              />
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>Requirements:</label>
          {course.requirements.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, 'requirements', index)}
              />
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>About Course:</label>
          <input
            type="text"
            name="aboutCourse.intro"
            value={course.aboutCourse.intro}
            onChange={handleChange}
            placeholder="Intro"
          />
        </div>
        <div className="form-group">
          <label>Why This Course:</label>
          <input
            type="text"
            name="whythisCourse.title"
            value={course.whythisCourse.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="whythisCourse.intro"
            value={course.whythisCourse.intro}
            onChange={handleChange}
            placeholder="Intro"
          />
          <input
            type="text"
            name="whythisCourse.outro"
            value={course.whythisCourse.outro}
            onChange={handleChange}
            placeholder="Outro"
          />
        </div>
        <div className="form-group">
          <label>Who It's For:</label>
          {course.whoitsfor.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, 'whoitsfor', index)}
              />
            </div>
          ))}
        </div>
        <button type="submit"  className="submit-button" disabled={isLoading}>Add Course</button>
        {isError && <p className="error-message">Failed to add course: {error.message}</p>}
        {isSuccess && <p className="success-message">Course added successfully!</p>}
      </form>
    </div>
  );
};

export default AddCourse;
