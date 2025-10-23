import { BrowserRouter as Router, Routes, Route } from "react-router"
import Layout from "src/components/Layout.jsx"
import Index from "src/pages/index.jsx"
import Schemes from "src/pages/Schemes.jsx"
import Colors from "src/pages/Colors.jsx"
import AuthRequired from "src/components/AuthRequired.jsx"

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
