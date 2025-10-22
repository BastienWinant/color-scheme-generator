import { BrowserRouter as Router, Routes, Route } from "react-router"
import Layout from "@/components/Layout.jsx"
import Index from "@/pages/index.jsx"
import Schemes from "@/pages/Schemes.jsx"
import Colors from "@/pages/Colors.jsx"
import AuthRequired from "@/components/AuthRequired.jsx"
import './App.css'

function App() {
  return (
    <Router>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Index />} />
					<Route element={<AuthRequired />}>
						<Route path="schemes" element={<Schemes />} />
						<Route path="colors" element={<Colors />} />
					</Route>
				</Route>
			</Routes>
		</Router>
  )
}

export default App
