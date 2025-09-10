import { Card, Heading } from "@chakra-ui/react"

export default function ColorCard({color}) {
  return (
    <Card.Root
			flexShrink="1"
			flexGrow="1"
			size="sm"
			flexDirection={{ base: "row", lg: "column-reverse" }}
			alignItems={{ base: "center" }}
			justifyContent={{ base: "space-between" }}
			gap={{ lg: 4 }}
			py={{ base: 0, lg: 6 }}
			rounded="0"
			border="0"
			bg={color.hex.value}
			color={color.contrast.value}
		>
			<Card.Header py="0">
				<Heading size="md" textAlign="center">{color.name.value}</Heading>
			</Card.Header>
			<Card.Body py="0">this is the body</Card.Body>
    </Card.Root>
  )
}