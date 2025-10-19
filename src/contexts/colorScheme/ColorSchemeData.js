import { useEffect, useState } from "react"

export const ColorSchemeData = () => {
	const [colorScheme, setColorScheme] = useState(null)
	const [seedColor, setSeedColor] = useState("")
	const [count, setCount] = useState(null)
	const [mode, setMode] = useState("")

	useEffect(() => {
		const scheme = JSON.parse(localStorage.getItem("color-scheme"))

		if (scheme) {
			setColorScheme(scheme)
			setCount(scheme.count)
			setMode(scheme.mode)
			setSeedColor(scheme.seed.hex.value)
		} else {
			console.log("no color scheme")
		}
	}, []);

	return {
		colorScheme,
		setColorScheme,
		count,
		setCount,
		mode,
		setMode,
		seedColor,
		setSeedColor
	}
}