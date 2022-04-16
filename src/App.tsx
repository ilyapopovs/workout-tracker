import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './features/auth/views/LoginPage'
import RegisterPage from './features/auth/views/RegisterPage'
import CreatePage from './features/workout/views/CreatePage'
import HomePage from './features/workout/views/HomePage'
import WorkoutPage from './features/workout/views/WorkoutPage'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const titles = {
  '/': 'Workouts | Workout Tracker',
  '/create': 'Add New Workout | Workout Tracker',
  '/workout': 'Workout Overview | Workout Tracker',
  '/login': 'Login | Workout Tracker',
  '/register': 'Create an Account | Workout Tracker',
  default: 'Unknown page | Workout Tracker',
}

function App() {
  const location = useLocation()

  useEffect(() => {
    const topPath = location.pathname.match(/\/[^/]*/)![0]
    // @ts-ignore
    document.title = titles[topPath] ?? titles.default
  }, [location])

  return (
    <>
      <Navbar />
      <main className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/create"
            element={
              <RequireAuth>
                <CreatePage />
              </RequireAuth>
            }
          />
          <Route
            path="/workout/:workoutId"
            element={
              <RequireAuth>
                <WorkoutPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" />
        </Routes>
      </main>
    </>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useSelector((state: any) => state.auth.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default App
