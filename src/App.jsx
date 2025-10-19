import { BrowserRouter as Router, Routes, Route } from "react-router"
import Layout from "@/components/Layout.jsx"
import Index from "@/pages/index.jsx"
import AuthRequired from "@/components/AuthRequired.jsx"
import './App.css'

function App() {
  return (
    <Router>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Index />} />
					<Route element={<AuthRequired />}>
						<Route path="protected" element={<h1>this is a protected route</h1>} />
					</Route>
				</Route>
			</Routes>
		</Router>
  )
}

export default App
