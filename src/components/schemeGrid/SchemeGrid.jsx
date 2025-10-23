import { ScrollArea, Container, Grid, For } from "@chakra-ui/react"
import ColorSchemeCard from "src/components/schemeGrid/ColorSchemeCard.jsx"

export default function SchemeGrid({ colorSchemes }) {
	return (
		<ScrollArea.Root height="90vh" variant="hover">
			<ScrollArea.Viewport>
				<ScrollArea.Content paddingEnd="3">
					<Container py="10">
						<Grid
							autoRows="1fr"
							templateColumns="repeat(auto-fit, minmax(340px, 1fr))"
							gap="8"
						>
							<For each={Object.entries(colorSchemes)}>
								{(item, index) => {
									return <ColorSchemeCard key={index} databaseKey={item[0]} schemeObject={item[1]} />
								}}
							</For>
						</Grid>
					</Container>
				</ScrollArea.Content>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar />
		</ScrollArea.Root>
	)
}