import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './features/auth/views/LoginPage'
import RegisterPage from './features/auth/views/RegisterPage'
import CreatePage from './features/wourkout/views/CreatePage'
import HomePage from './features/wourkout/views/HomePage'

function App() {
  return (
    <>
      <Navbar />
      <main className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" />
        </Routes>
      </main>
    </>
  )
}

export default App
