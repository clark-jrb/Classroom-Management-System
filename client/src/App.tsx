import '@/styles/App.scss'
import { Routes, Route } from 'react-router-dom'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Home } from '@/pages/Home'
import { AuthenticatedRoutes } from '@/pages/Authenticated'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'

const queryClient = new QueryClient()

function App() {
  const authRoutes = [
    { path: '/login', element: <Login/> },
    { path: '/register', element: <Register/> },
    { path: '/home', element: <Home/> },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
          {/* authentication routes */}
          {authRoutes && authRoutes.map(({ path, element }, index) => (
            <Route  key={index} path={path} element={element}/>
          ))}
          {/* for authenticated users  */}
          <Route path='/*' element={
              <Suspense fallback={<div>Loading...</div>}>
                <AuthenticatedRoutes/>
              </Suspense>
            }
          />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
