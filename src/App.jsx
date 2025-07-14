import { BrowserRouter as Router, Routes, Route } from "react-router";
import './App.css'

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<h1>this is the home page</h1>} />
          <Route path="/user" element={<h1>this is the user page</h1>} />
        </Routes>
      </Router>
  )
}

export default App
