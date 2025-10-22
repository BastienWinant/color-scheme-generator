import { Box, Button, Card, Image, DataList } from "@chakra-ui/react"

export default function ColorSchemeCard({ colorScheme }) {
	const stats = [
		{ label: "Seed Color", value: colorScheme.seed.hex.value, diff: -12, helpText: "Till date" },
		{ label: "Color Count", value: colorScheme.count, diff: 12, helpText: "Last 30 days" },
		{ label: "Mode", value: colorScheme.mode, diff: 4.5, helpText: "Last 30 days" },
	]

	return (
		<Card.Root flexDirection="row" overflow="hidden">
			<Image
				objectFit="cover"
				src={colorScheme.image.bare}
				alt="Color scheme."
			/>
			<Box>
				<Card.Body>
					<DataList.Root orientation="horizontal">
						{stats.map(item => (
							<DataList.Item key={item.label}>
								<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
								<DataList.ItemValue>{item.value}</DataList.ItemValue>
							</DataList.Item>
						))}
					</DataList.Root>
				</Card.Body>
				<Card.Footer>
					<Button>Buy Latte</Button>
				</Card.Footer>
			</Box>
		</Card.Root>
	)
}