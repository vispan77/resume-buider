import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'

import Dashboard from './page/Dashboard'
import ResumeBuilder from './page/ResumeBuilder'
import Preview from './page/Preview'
import Login from './page/Login'
import Layout from './page/Layout'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
