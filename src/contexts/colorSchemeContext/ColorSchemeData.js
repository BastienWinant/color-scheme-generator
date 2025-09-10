import {useEffect, useState} from "react";
import data from './colordata.json'
import { createListCollection } from "@chakra-ui/react"

export default function ColorSchemeData() {
	const [color, setColor] = useState("#eb5e41")
	const [mode, setMode] = useState('monochrome')
	const [count, setCount] = useState("5")
	const [colorScheme, setColorScheme] = useState(null)

	useEffect(() => {
		const prevColorScheme = JSON.parse(localStorage.getItem("color-scheme"))

		if (prevColorScheme) {
			setColorScheme(prevColorScheme)
			setColor(prevColorScheme.seed.rgb.value)
			setMode(prevColorScheme.mode)
			setCount(prevColorScheme.count)
		} else {
			setColorScheme(data)
			setColor(data.seed.rgb.value)
			setMode(data.mode)
			setCount(data.count)
		}
	}, [])

	const modes = createListCollection({
		items: [
			{ label: "Monochrome", value: "monochrome" },
			{ label: "Monochrome (dark)", value: "monochrome-dark" },
			{ label: "Monochrome (light)", value: "monochrome-light" },
			{ label: "Analogic", value: "analogic" },
			{ label: "Complement", value: "complement" },
			{ label: "Analogic-complement", value: "analogic-complement" },
			{ label: "Triad", value: "triad" },
			{ label: "Quad", value: "quad" }
		],
	})

	const getColorScheme = () => {
		const base_url = "https://www.thecolorapi.com"
		const endpoint = "scheme"
		const url_color = color.replace(" ", "")

		const url = `${base_url}/${endpoint}?rgb=${url_color}&format=json&mode=${mode}&count=${count}`

		fetch(url)
			.then(response => response.json())
			.then(data => {
				setColorScheme(data)
				localStorage.setItem("color-scheme", data)
			})
	}

	return {
		color,
		setColor,
		mode,
		setMode,
		count,
		setCount,
		colorScheme,
		setColorScheme,
		getColorScheme,
		modes
	}
}