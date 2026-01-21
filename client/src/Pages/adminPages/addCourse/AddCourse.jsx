import React, { useEffect, useState } from "react";
import {
  useAddCourseMutation,
  useUpdateCourseMutation,
} from "../../../features/Course/CourseApiSlice";
import "../../../styles/AddCourse.css";
import { useLocation } from "react-router-dom";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    img: "",
    description: "",
    level: "",
    price: "",
    discount_price: "",
    aboutCourse: { intro: "" },
    whythisCourse: { title: "", intro: "", outro: "" },
    learnings: [""],
    requirements: [""],
    whoitsfor: [""],
    courseContent: [{ contentTitle: "", url: "", time: "", assignment: "" }],
    notes: {
      notesUrl: "",
      notesTitle: "",
    },
    enabled: true,
  });

  const [addCourse, { isLoading }] = useAddCourseMutation();
  const [updateCourse, { isLoading: updateLoading }] =
    useUpdateCourseMutation();

  const location = useLocation();
  const existingData = location?.state?.course;

  useEffect(() => {
    if (existingData) setCourse(existingData);
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const keys = name.split(".");

    if (keys.length === 1) {
      setCourse((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else {
      setCourse((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...course[field]];
    updated[index] = value;
    setCourse((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field) => {
    setCourse((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    setCourse((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...course.courseContent];
    updated[index][field] = value;
    setCourse((prev) => ({ ...prev, courseContent: updated }));
  };

  const addContent = () => {
    setCourse((prev) => ({
      ...prev,
      courseContent: [
        ...prev.courseContent,
        { contentTitle: "", url: "", time: "", assignment: "" },
      ],
    }));
  };

  const removeContent = (index) => {
    setCourse((prev) => ({
      ...prev,
      courseContent: prev.courseContent.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...course,
      price: Number(course.price),
      discount_price: Number(course.discount_price),
    };

    try {
      if (existingData) {
        await updateCourse({ courseId: existingData._id, ...payload }).unwrap();
        alert("Course updated successfully!");
      } else {
        await addCourse(payload).unwrap();
        alert("Course added successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="course-container">
      <h2>{existingData ? "Update Course" : "Add Course"}</h2>

      <form onSubmit={handleSubmit} className="course-form">
        {["title", "img", "level", "price", "discount_price"].map((field) => (
          <input
            key={field}
            type={field.includes("price") ? "number" : "text"}
            name={field}
            placeholder={field.toUpperCase()}
            value={course[field]}
            onChange={handleChange}
            required
          />
        ))}

        <textarea
          name="description"
          placeholder="Course Description"
          value={course.description}
          onChange={handleChange}
          required
        />

        {["learnings", "requirements", "whoitsfor"].map((field) => (
          <div key={field}>
            <h4>{field.toUpperCase()}</h4>
            {course[field].map((item, index) => (
              <div key={index}>
                <input
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(field, index, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(field, index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem(field)}>
              Add
            </button>
          </div>
        ))}

        <textarea
          name="aboutCourse.intro"
          placeholder="About Course Intro"
          value={course.aboutCourse.intro}
          onChange={handleChange}
        />

        {["title", "intro", "outro"].map((f) => (
          <input
            key={f}
            name={`whythisCourse.${f}`}
            placeholder={f}
            value={course.whythisCourse[f]}
            onChange={handleChange}
          />
        ))}

        <h4>Course Content</h4>
        {course.courseContent.map((c, i) => (
          <div key={i}>
            <input
              placeholder="Title"
              value={c.contentTitle}
              onChange={(e) =>
                handleContentChange(i, "contentTitle", e.target.value)
              }
            />
            <input
              placeholder="URL"
              value={c.url}
              onChange={(e) => handleContentChange(i, "url", e.target.value)}
            />
            <input
              placeholder="Time"
              value={c.time}
              onChange={(e) => handleContentChange(i, "time", e.target.value)}
            />
            <input
              placeholder="Assignment"
              value={c.assignment}
              onChange={(e) => handleContentChange(i, "assignment", e.target.value)}
            />
            <button type="button" onClick={() => removeContent(i)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addContent}>
          Add Content
        </button>

        <input
          name="notes.notesTitle"
          placeholder="Notes Title"
          value={course.notes.notesTitle}
          onChange={handleChange}
        />
        <input
          name="notes.notesUrl"
          placeholder="Notes URL"
          value={course.notes.notesUrl}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="enabled"
            checked={course.enabled}
            onChange={handleChange}
          />
          Enabled
        </label>

        <button type="submit" disabled={isLoading || updateLoading}>
          {existingData ? "Update Course" : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
