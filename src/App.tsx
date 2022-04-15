import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './features/auth/views/LoginPage'
import RegisterPage from './features/auth/views/RegisterPage'
import CreatePage from './features/wourkout/views/CreatePage'
import HomePage from './features/wourkout/views/HomePage'
import WorkoutPage from './features/wourkout/views/WorkoutPage'
import { useEffect } from 'react'

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
          <Route path="/create" element={<CreatePage />} />
          <Route path="/workout/:workoutId" element={<WorkoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" />
        </Routes>
      </main>
    </>
  )
}

export default App
