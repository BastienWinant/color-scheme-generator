import { ColorSchemeContext } from "./ColorSchemeContext.js"
import ColorSchemeData from "@/contexts/colorSchemeContext/ColorSchemeData.js";

export function ColorSchemeProvider({ children }) {
	const colorSchemeContext = ColorSchemeData()

	return (
		<ColorSchemeContext.Provider value={colorSchemeContext}>
			{ children }
		</ColorSchemeContext.Provider>)
}