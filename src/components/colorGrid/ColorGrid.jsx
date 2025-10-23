import { ScrollArea, Container, Grid, For } from "@chakra-ui/react"
import ColorCard from "@/components/colorGrid/ColorCard.jsx";

export default function ColorGrid({ colors }) {
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
							<For each={Object.values(colors)}>
								{(item, index) => {
									return <ColorCard key={index} colorObject={item} />
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