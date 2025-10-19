import { Stack, Grid, Container, For, GridItem } from "@chakra-ui/react"
import Generator from "@/components/generator/Generator.jsx"
import ColorCard from "@/components/ColorCard.jsx"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"

export default function Index() {
	const { colorScheme, setColorScheme } = useColorSchemeContext()

	const getColorScheme = async () => {
		const base_url = "https://www.thecolorapi.com"
		const endpoint = "scheme"
		const url_color = "0,71,171"
		const mode = "analogic"
		const count = 5

		const url = `${base_url}/${endpoint}?rgb=${url_color}&format=json&mode=${mode}&count=${count}`

		const response = await fetch(url)
		const data = await response.json()

		localStorage.setItem("color-scheme", JSON.stringify(data))
		setColorScheme(data)
	}

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
				border="1px solid red"
			>
				<Generator />
			</Container>
		</Stack>
	)
}