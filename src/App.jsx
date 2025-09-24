import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/components/layout/Layout.jsx";
import Index from "@/pages/Index.jsx";
import AuthRequired from "@/components/AuthRequired.jsx";
import Schemes from "@/pages/Schemes.jsx";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route element={<AuthRequired />}>
            <Route path="schemes" element={<Schemes />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
