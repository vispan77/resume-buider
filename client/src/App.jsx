import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'

import Dashboard from './page/Dashboard'
import ResumeBuilder from './page/ResumeBuilder'
import Preview from './page/Preview'
import Login from './page/Login'
import Layout from './page/Layout'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { User } from 'lucide-react'
import { login, setLoading } from './app/features/authSlice'
import { useEffect } from 'react';
import { Toaster } from "react-hot-toast"

function App() {
  const dispatch = useDispatch();

  const getuserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {

        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token }
        })

        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }

        dispatch(setLoading(false))

      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message)
    }
  }

  useEffect(() => {
    getuserData()
  }, [])

  return (
    <div>
      <Toaster />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />
        {/* <Route path='login' element={<Login />} /> */}
      </Routes>
    </div>
  )
}

export default App
