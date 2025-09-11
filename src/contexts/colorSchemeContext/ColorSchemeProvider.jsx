import { ColorSchemeContext } from "./ColorSchemeContext.js"
import ColorSchemeData from "@/contexts/colorSchemeContext/ColorSchemeData.js";

export function ColorSchemeProvider({ children }) {
	const colorSchemeData = ColorSchemeData()

	return (
		<ColorSchemeContext.Provider value={colorSchemeData}>
			{ children }
		</ColorSchemeContext.Provider>)
}