import { Box, Card, DataList, Image, Text } from "@chakra-ui/react"

export default function SchemeSummaryCard({ colorScheme }) {
	return (
		<Card.Root flexDirection="row" overflow="hidden">
			<Image
				objectFit="cover"
				maxW="1/3"
				src={colorScheme.image.bare}
				alt="Caffe Latte"
			/>
			<Box>
				<Card.Body>
					<DataList.Root my="8" orientation="horizontal">
						<DataList.Item>
							<DataList.ItemLabel>Seed Color</DataList.ItemLabel>
							<DataList.ItemValue>
								<Text>{colorScheme.seed.hex.value}</Text>
							</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item>
							<DataList.ItemLabel>Count</DataList.ItemLabel>
							<DataList.ItemValue>
								<Text>{colorScheme.count}</Text>
							</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item>
							<DataList.ItemLabel>Mode</DataList.ItemLabel>
							<DataList.ItemValue>
								<Text>{colorScheme.mode}</Text>
							</DataList.ItemValue>
						</DataList.Item>
					</DataList.Root>
				</Card.Body>
			</Box>
		</Card.Root>
	)
}