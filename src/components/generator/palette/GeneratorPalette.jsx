import { Grid, For } from "@chakra-ui/react"
import ColorCard from "@/components/generator/palette/ColorCard.jsx"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"

export default function GeneratorPalette() {
	const { colorScheme } = useColorSchemeContext()

	return (
		<Grid
			flexGrow="1"
			templateColumns={{ base: "1fr", lg: "repeat(auto-fit, minmax(160px, 1fr))" }}
			autoRows="1fr"
		>
			<For each={colorScheme?.colors}>
				{(item, index) => {
					return <ColorCard key={index} color={item} />
				}}
			</For>
		</Grid>
	)
}