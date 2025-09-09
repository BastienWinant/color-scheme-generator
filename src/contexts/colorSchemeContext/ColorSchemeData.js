import {useEffect, useState} from "react";
import data from './colordata.json'
import { createListCollection, parseColor } from "@chakra-ui/react"

export default function ColorSchemeData() {
	const [color, setColor] = useState(parseColor("#eb5e41"))
	const [mode, setMode] = useState(['monochrome'])
	const [count, setCount] = useState("5")
	const [colorScheme, setColorScheme] = useState(null)

	useEffect(() => {
		const prevColorScheme = JSON.parse(localStorage.getItem("color-scheme"))

		if (prevColorScheme) {
			setColorScheme(prevColorScheme)
			setColor(parseColor(prevColorScheme.seed.hex.value))
			setMode([prevColorScheme.mode])
			setCount(prevColorScheme.count)
		} else {
			setColorScheme(data)
			setColor(parseColor(data.seed.hex.value))
			setMode([data.mode])
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

	return {
		color,
		setColor,
		mode,
		setMode,
		count,
		setCount,
		colorScheme,
		setColorScheme,
		modes
	}
}