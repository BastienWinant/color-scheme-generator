import { Card, Heading, HStack, IconButton } from "@chakra-ui/react"
import { FaRegClipboard, FaHeart, FaRegHeart, FaXmark } from "react-icons/fa6";

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
			bg={ color.hex.value }
			color={ color.contrast.value }
		>
			<Card.Header py="0">
				<Heading size="md" textAlign="center">{color.name.value}</Heading>
			</Card.Header>
			<Card.Body
				py="0"
				px={{ lg: "0" }}
				alignItems={{ base: "flex-end", lg: "stretch" }}
				justifyContent={{ base: "flex-end" }}
			>
				<HStack>
					<IconButton variant="plain" size="sm" color={ color.contrast.value }>
						<FaRegClipboard />
					</IconButton>
					<IconButton variant="plain" size="sm" color={ color.contrast.value }>
						<FaRegHeart />
					</IconButton>
					<IconButton variant="plain" size="sm" color={ color.contrast.value }>
						<FaXmark />
					</IconButton>
				</HStack>
			</Card.Body>
    </Card.Root>
  )
}