import React from 'react'

import RequireAuth from './RequireAuth/RequireAuth'

import Layout from './components/Layout/Layout'
import Home from './Pages/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Courses from './components/Courses/Courses'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Cource from './components/Courses/Course'

function App() {
  return (
  <Router>
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route element={<RequireAuth allowedRole={['user','admin']} />} >
            <Route path='/courses' element={<Courses/>} />
            <Route path='/course/:id' element={<Cource/>}/>
          </Route>
        </Route>

    </Routes>
  </Router>
  )
}

export default App