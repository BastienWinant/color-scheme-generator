import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/components/layout/Layout.jsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>this is the main page</h1>} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
