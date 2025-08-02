import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function Generator() {
	const [colorPalette, setColorPalette] = useState({})

	const getColorPalette = async () => {
		const url = `https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html&mode=analogic&count=6`
		const palette = await fetch(url).then(res => res.json()).then(data => data)
		return palette
	}

	useEffect(() => {
		setColorPalette(getColorPalette())
	}, []);

	console.log(colorPalette)
	return (
		<Box borderWidth="medium">this is the generator</Box>
	)
}