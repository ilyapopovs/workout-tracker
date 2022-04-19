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
      <main className="pb-28">
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
      <footer className="absolute bottom-0 w-full h-16 border-t">
        <div className="h-full flex justify-center font-sans font-normal text-sm">
          <a
            target="_blank"
            className="flex items-center mr-4"
            href="https://github.com/ilyapopovs/workout-tracker"
          >
            <span className="mr-2">GitHub</span>
            <svg
              className="inline logo"
              fill="hsl(var(--color-text-primary))"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"></path>
            </svg>
          </a>
        </div>
      </footer>
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
