import { useEffect, useState } from "react"

export const ColorSchemeData = () => {
	const [colorScheme, setColorScheme] = useState(() => {
		const stored = localStorage.getItem("color-scheme")
		return stored ? JSON.parse(stored) : { colors: [], count: 0, mode: "default" }
	})

	const [seedColor, setSeedColor] = useState("")
	const [count, setCount] = useState(null)
	const [mode, setMode] = useState("")

	useEffect(() => {
		localStorage.setItem("color-scheme", JSON.stringify(colorScheme));
		setCount(colorScheme.count)
		setMode(colorScheme.mode)
		setSeedColor(colorScheme.seed.hex.value)
	}, [colorScheme]);

	const getColorScheme = async () => {
		const base_url = "https://www.thecolorapi.com"
		const endpoint = "scheme"
		const urlColor = seedColor.replaceAll(" ", "")
		const url = `${base_url}/${endpoint}?rgb=${urlColor}&format=json&mode=${mode}&count=${count}`

		const response = await fetch(url)
		const data = await response.json()

		setColorScheme(data)
	}

	return {
		colorScheme,
		setColorScheme,
		count,
		setCount,
		mode,
		setMode,
		seedColor,
		setSeedColor,
		getColorScheme
	}
}