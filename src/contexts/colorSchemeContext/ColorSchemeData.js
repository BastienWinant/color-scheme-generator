import {useEffect, useState} from "react";
import data from './colordata.json'

export default function ColorSchemeData() {
	const [colorScheme, setColorScheme] = useState(null)

	useEffect(() => {
		const prevColorScheme = JSON.parse(localStorage.getItem("color-scheme"))

		if (prevColorScheme) {
			setColorScheme(prevColorScheme)
		} else {
			setColorScheme(data)
		}
	}, []);

	return {colorScheme, setColorScheme}
}