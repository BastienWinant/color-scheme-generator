import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/components/layout/Layout.jsx";
import Generator from "@/pages/generator.jsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Generator />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
