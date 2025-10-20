import { Stack, Grid, Container, For, GridItem } from "@chakra-ui/react"
import Generator from "@/components/generator/Generator.jsx"
import ColorCard from "@/components/ColorCard.jsx"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"
import { Toaster } from "@/components/ui/toaster"

export default function Index() {
	const { colorScheme } = useColorSchemeContext()

	return (
		<Stack w="full" gap="0">
			<Grid
				flexGrow="1"
				templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(120px, 1fr))" }}
				autoRows="1fr"
			>
				<For each={colorScheme?.colors}>
					{(item, index) => {
						return <ColorCard key={index} colorObject={item} />
					}}
				</For>
			</Grid>
			<Container
				display="flex"
				justifyContent="flex-end"
				py="3"
			>
				<Generator />
			</Container>
			<Toaster />
		</Stack>
	)
}