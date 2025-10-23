import { ColorSchemeContext } from "src/contexts/colorScheme/ColorSchemeContext.js"
import {ColorSchemeData} from "src/contexts/colorScheme/ColorSchemeData.js"

export function ColorSchemeProvider({ children }) {
	const schemeData = ColorSchemeData()
	return <ColorSchemeContext.Provider value={schemeData}>{children}</ColorSchemeContext.Provider>
}