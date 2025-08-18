import {useEffect, useState} from "react";
import { Flex, Stack, For, Box } from "@chakra-ui/react";
import { nanoid } from 'nanoid';
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

	console.log(colorScheme.colors?.map(colorObj => colorObj.hex.clean).join("\n"))
	return (
		<Flex
			direction="column"
		>
			<Flex
				flexGrow="1"
				direction="column"
				border="2px solid yellow"
			>
				{colorScheme &&
					<For each={colorScheme.colors}>
						{(colorObj, index) => (
							<Flex
								key={nanoid()}
								flexGrow="1"
								align="center"
								justifyContent="space-between"
								bg={colorObj.hex.value}
								color={colorObj.contrast.value}
							>
								<p>{colorObj.name.value}</p>
								<p>{colorObj.hex.clean}</p>
							</Flex>
						)}
					</For>
				}
			</Flex>
		</Flex>
	)
}