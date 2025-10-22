import { Card, DataList, Text, Avatar, AvatarGroup } from "@chakra-ui/react"

export default function SchemeSummaryCard({ colorScheme }) {
	console.log(colorScheme)
	return (
		<Card.Root overflow="hidden" border="0">
			<AvatarGroup size="xl" stacking="last-on-top">
				{colorScheme?.colors.map(item => (
					<Avatar.Root key={item.name.value}>
						<Avatar.Fallback name={item.name.value} />
						<Avatar.Image src={item.image.bare} />
					</Avatar.Root>
				))}
			</AvatarGroup>
			<Card.Body px="0">
				<DataList.Root my="4" orientation="horizontal">
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
		</Card.Root>
	)
}