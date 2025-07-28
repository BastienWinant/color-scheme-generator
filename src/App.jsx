import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/components/layout/Layout.jsx";
import AuthRequired from "@/components/authRequired/AuthRequired.jsx";
import Generator from "@/pages/home.jsx";
import Dashboard from "@/pages/dashboard.jsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Generator />} />
            <Route element={<AuthRequired />}>
              <Route path="user" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
  )
}

export default App
