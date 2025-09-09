import { Stack } from "@chakra-ui/react"
import ColorCard from "@/components/generator/palette/ColorCard.jsx"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"
import { nanoid } from "nanoid"

export default function GeneratorPalette() {
	const { colorScheme } = useColorSchemeContext()

	console.log(colorScheme)

	const colorCards = colorScheme?.colors.map(color => <ColorCard key={nanoid()} color={color} />)

	return (
		<Stack
			direction={{base: "column", lg: "row"}}
			flexGrow="1"
			gap="0"
		>
			{colorCards}
		</Stack>
	)
}