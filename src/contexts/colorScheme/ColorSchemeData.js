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

	const getColorScheme = async () => {
		const base_url = "https://www.thecolorapi.com"
		const endpoint = "scheme"
		const urlColor = seedColor.replaceAll(" ", "")
		const url = `${base_url}/${endpoint}?rgb=${urlColor}&format=json&mode=${mode}&count=${count}`

		console.log(url)

		const response = await fetch(url)
		const data = await response.json()

		setColorScheme(data)
		localStorage.setItem("color-scheme", JSON.stringify(data))
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