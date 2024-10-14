// import { useState } from 'react'
import './styles/App.scss'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  const authRoutes = [
    { path: '/login', element: <Login/> },
    { path: '/register', element: <Register/> },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
          {authRoutes && authRoutes.map(({ path, element }, index) => (
            <Route  key={index} path={path} element={element}/>
          ))}
      </Routes>
    </QueryClientProvider>
  )
}

export default App
