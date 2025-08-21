import {useEffect, useState} from "react";
import { Flex } from "@chakra-ui/react";
import Dashboard from "./Dashboard.jsx";
import Palette from "./Palette.jsx";
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"

export default function Generator() {
	const { colorScheme } = useColorSchemeContext()

	return (
		<Flex
			direction="column-reverse"
		>
			<Dashboard />
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