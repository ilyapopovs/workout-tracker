import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <main className="App">
        <Routes>
          <Route path="/">root</Route>
          <Route path="*">any</Route>
        </Routes>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </>
  )
}

export default App
