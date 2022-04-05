import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './features/auth/views/LoginPage'
import RegisterPage from './features/auth/views/RegisterPage'

function App() {
  return (
    <>
      <Navbar />
      <main className="App">
        <Routes>
          <Route path="/">root</Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" />
        </Routes>
      </main>
    </>
  )
}

export default App
