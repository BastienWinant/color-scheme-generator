import {useEffect, useState} from "react";
import { Flex } from "@chakra-ui/react";
import Form from "./Form.jsx";
import Palette from "./Palette.jsx";
import data from './colordata.json'

export default function Generator() {
	const [colorScheme, setColorScheme] = useState({})

	const updateColorScheme = (url) => {
		setColorScheme(data)
	}

	useEffect(() => {
		const url = "https://www.thecolorapi.com/scheme?hex=24B1E0&mode=monochrome&count=5"
		updateColorScheme(url)
	}, []);

	return (
		<Flex
			direction="column-reverse"
		>
			<Form />
			<Flex
				flexGrow="1"
				direction="column"
				border="2px solid yellow"
			>
				<Palette colorScheme={colorScheme} />
			</Flex>
		</Flex>
	)
}