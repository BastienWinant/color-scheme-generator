import { Grid } from "@chakra-ui/react"
import ColorCard from "@/components/generator/palette/ColorCard.jsx"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"
import { nanoid } from "nanoid"

export default function GeneratorPalette() {
	const { colorScheme } = useColorSchemeContext()

	const colorCards = colorScheme?.colors.map(color => <ColorCard key={nanoid()} color={color} />)

	return (
		<Grid
			flexGrow="1"
			templateColumns={{ base: "1fr", lg: "repeat(auto-fit, minmax(160px, 1fr))" }}
			autoRows="1fr"
		>
			{colorCards}
		</Grid>
	)
}