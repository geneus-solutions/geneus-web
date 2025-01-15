import React from 'react'

function CourseCard({ title, image, duration, description }) {
  return (
    <div style={{ width: "380px",}}>
      <img src={image} alt="Course" style={{ width: "100%", }} />
      <div style={{ padding: "15px" }}>
        <div style={{ marginTop: "15px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <h4 style={{ marginBottom: "10px" }}>{title}</h4>
          <div style={{ fontSize: "14px", color: "#555" }}>
            <p>{duration}</p>
          </div>
        </div>
        <p style={{ fontSize: "14px", color: "#777", marginTop: "10px" }}>
          {description}
        </p>
      </div>
    </div>
  )
}

export default CourseCard
