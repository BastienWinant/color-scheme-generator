import { ColorSchemeContext } from "./ColorSchemeContext.js"
import { useEffect, useState } from "react"
import data from './colordata.json'

export function ColorSchemeProvider({ children }) {
	const [colorScheme, setColorScheme] = useState(null)

	useEffect(() => {
		setColorScheme(data)
	}, []);

	return (
		<ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
			{ children }
		</ColorSchemeContext.Provider>)
}