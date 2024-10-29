// import { useState } from 'react'
import './styles/App.scss'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { StudentDashboard } from './pages/Student/StudentDashboard'
import { Grades } from './pages/Student/Grades'
import { Profile } from './pages/Student/Profile'
import { Student, Faculty } from './pages/Authenticated'
import { FacultyDashboard } from './pages/Faculty/FacultyDashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const authRoutes = [
    { path: '/login', element: <Login/> },
    { path: '/register', element: <Register/> },
  ]

  const studentRoutes = [
    { path: '/', element: <StudentDashboard/> },
    { path: '/grades', element: <Grades/> }
    { path: '/profile', element: <Profile/> }
  ]
  
  const facultyRoutes = [
    { path: '/faculty', element: <FacultyDashboard/> }
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
          {/* authentication routes */}
          {authRoutes && authRoutes.map(({ path, element }, index) => (
            <Route  key={index} path={path} element={element}/>
          ))}
          {/* Student Routes */}
          <Route element={<Student/>}>
            {studentRoutes && studentRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element}/>
            ))}
          </Route>
          {/* faculty routes */}
          <Route element={<Faculty/>}>
            {facultyRoutes && facultyRoutes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element}/>
            ))}
          </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
