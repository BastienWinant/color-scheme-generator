import { Stack } from "@chakra-ui/react"
import ColorCard from "@/components/generator/palette/ColorCard.jsx"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"

export default function GeneratorPalette() {
	const { colorScheme } = useColorSchemeContext()

	return (
		<Stack
			direction={{base: "column", lg: "row"}}
			flexGrow="1"
			gap="0"
			border="2px solid orange;"
		>
			<ColorCard />
			<ColorCard />
			<ColorCard />
			<ColorCard />
			<ColorCard />
		</Stack>
	)
}