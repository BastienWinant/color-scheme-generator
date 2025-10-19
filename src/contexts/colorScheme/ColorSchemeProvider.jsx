import { ColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"
import {ColorSchemeData} from "@/contexts/colorScheme/ColorSchemeData.js"

export function ColorSchemeProvider({ children }) {
	const schemeData = ColorSchemeData()
	return <ColorSchemeContext.Provider value={schemeData}>{children}</ColorSchemeContext.Provider>
}