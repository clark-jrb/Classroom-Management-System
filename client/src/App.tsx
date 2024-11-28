// import { useState } from 'react'
import '@/styles/App.scss'
import { Routes, Route } from 'react-router-dom'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { StudentDashboard } from '@/pages/Student/StudentDashboard'
import { Grades } from '@/pages/Student/Grades'
import { StudentProfile } from '@/pages/Student/StudentProfile'
import { Home } from '@/pages/Home'
import { Student, Faculty } from '@/pages/Authenticated'
import { FacultyDashboard } from '@/pages/Faculty/FacultyDashboard'
import { FacultyProfile } from './pages/Faculty/FacultyProfile'
import { MyClasses } from './pages/Faculty/MyClasses'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const authRoutes = [
    { path: '/login', element: <Login/> },
    { path: '/register', element: <Register/> },
    { path: '/home', element: <Home/> },
  ]

  const studentRoutes = [
    { path: '/', element: <StudentDashboard/> },
    { path: '/grades', element: <Grades/> },
    { path: '/profile', element: <StudentProfile/> }
  ]
  
  const facultyRoutes = [
    { path: '/faculty', element: <FacultyDashboard/> },
    { path: '/faculty/classes', element: <MyClasses/> },
    { path: '/faculty/profile', element: <FacultyProfile/> }
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
