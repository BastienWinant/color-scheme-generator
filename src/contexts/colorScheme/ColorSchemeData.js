import { useEffect, useState } from "react"

export const ColorSchemeData = () => {
	/**
	 * Initialize color scheme from localStorage or random values
	 */
	const [colorScheme, setColorScheme] = useState(() => {
		const stored = localStorage.getItem("color-scheme")
		if (stored) return JSON.parse(stored)
		// Generate random defaults if nothing in localStorage
		return {
			colors: [],
			count: getRandomCount(),
			mode: getRandomMode(),
			seed: { hex: { value: getRandomHex() } },
		}
	})

	const [seedColor, setSeedColor] = useState(colorScheme.seed?.hex?.value || "")
	const [count, setCount] = useState(colorScheme.count || 0)
	const [mode, setMode] = useState(colorScheme.mode || "default")
	const [saved, setSaved] = useState(JSON.parse(localStorage.getItem("color-scheme-saved")) || false)

	const getRandomHex = () => {
		const r = Math.floor(Math.random() * 256) // 0-255
		const g = Math.floor(Math.random() * 256) // 0-255
		const b = Math.floor(Math.random() * 256) // 0-255

		return `${r},${g},${b}`
	}

	const getRandomMode = () => {
		const modes = ["default", "monochrome", "analogic", "triad", "quad"]
		return modes[Math.floor(Math.random() * modes.length)]
	}

	const getRandomCount = () => Math.floor(Math.random() * 3) + 4 // 4–6 colors

	/**
	 * Fetches a new color scheme for the Colors API
	 */
	const getColorScheme = async () => {
		const base_url = "https://www.thecolorapi.com"
		const endpoint = "scheme"
		const urlColor = seedColor.replaceAll(" ", "")

		const url = `${base_url}/${endpoint}?rgb=${urlColor}&mode=${mode}&count=${count}`

		try {
			const response = await fetch(url)
			if (!response.ok) throw new Error("Failed to fetch color scheme")
			const data = await response.json()
			setColorScheme(data)
		} catch (err) {
			console.error("Error fetching color scheme:", err)
		}
	}

	/**
	 * Generates a random color scheme if none is found in localStorage
	 */
	useEffect(() => {
		if (!localStorage.getItem("color-scheme")) {
			getColorScheme()
		}
	}, [])

	/**
	 * Listens for changes on the colorScheme state
	 * 1. store the data in localStorage
	 * 2. update the count, mode, and seedColor state variables
	 */
	useEffect(() => {
		localStorage.setItem("color-scheme", JSON.stringify(colorScheme))
		setCount(colorScheme.count || 0)
		setMode(colorScheme.mode || "default")
		setSeedColor(colorScheme.seed?.hex?.value || "")
	}, [colorScheme])

	return {
		colorScheme,
		setColorScheme,
		count,
		setCount,
		mode,
		setMode,
		seedColor,
		setSeedColor,
		getColorScheme,
		saved,
		setSaved
	}
}