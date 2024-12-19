import React, { useState } from 'react';
import axios from 'axios';
import "./AddCourse.css";

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
    aboutCourse: {
      intro: '',
    },
    whythisCourse: {
      title: '',
      intro: '',
      outro: '',
    },
    whoitsfor: [''],
  });

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
      console.log(course)
      const response = await axios.post('http://localhost:5000/api/courses/add', course);
      alert(response.data.message);
    } catch (error) {
      alert('Failed to add course');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={course.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" name="img" value={course.img} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={course.description} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Level:</label>
        <input type="text" name="level" value={course.level} onChange={handleChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={course.price} onChange={handleChange} />
      </div>
      <div>
        <label>Discount Price:</label>
        <input type="number" name="discount_price" value={course.discount_price} onChange={handleChange} />
      </div>
      <div>
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
      <div>
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
      <div>
        <label>About Course:</label>
        <input
          type="text"
          name="aboutCourse.intro"
          value={course.aboutCourse.intro}
          onChange={handleChange}
          placeholder="Intro"
        />
      </div>
      <div>
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
      <div>
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
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;


