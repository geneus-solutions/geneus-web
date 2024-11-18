import React from 'react'
import img1 from "../../assets/banner.jpeg"

function Heilight() {
  return (
    <div 
      className='container-fluid' 
      style={{
        position: 'relative',
        backgroundImage: `url(${img1})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '15vh', 
        marginTop: '20px',
        
      }}
    >
      
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 176, 255, 0.5)',  
          zIndex: 1, 
          borderRadius: '10px', 
        }}
      ></div>

  
      <div 
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-around', 
          alignItems: 'center',  
          height: '100%', 
        }}
      >
     
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '5px', marginTop : "5px" }}>4+</h2>
          <p style={{ fontSize: '1rem' }}>Courses</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '5px',marginTop : "5px" }}>4+</h2>
          <p style={{ fontSize: '1rem' }}>Courses</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '5px',marginTop : "5px" }}>4+</h2>
          <p style={{ fontSize: '1rem' }}>Courses</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '5px',marginTop : "5px" }}>4+</h2>
          <p style={{ fontSize: '1rem' }}>Courses</p>
        </div>
      </div>
    </div>
  )
}

export default Heilight
