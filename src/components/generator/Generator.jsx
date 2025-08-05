import { Box, Stack, For } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {nanoid} from "nanoid";
import data from './colordata.json'

export default function Generator() {
	const [colorScheme, setColorScheme] = useState({})

	const updateColorScheme = (url) => {
		// fetch(url)
		// 	.then(res => res.json())
		// 	.then(data => setColorScheme(data))

		setColorScheme(data)
	}

	useEffect(() => {
		const url = "https://www.thecolorapi.com/scheme?hex=24B1E0&mode=monochrome&count=5"
		updateColorScheme(url)
	}, []);

	return (
		<Box borderWidth="medium">
			<Stack gap="0">
				{colorScheme &&
					<For each={colorScheme.colors}>
						{(colorObj, index) => (
							<Box
								key={nanoid()}
								h="16"
								bg={colorObj.hex.value}
								color={colorObj.contrast.value}
							>
								{colorObj.name.value}
							</Box>
						)}
					</For>
				}
			</Stack>
		</Box>
	)
}