import { GridItem, Heading, ButtonGroup, IconButton } from "@chakra-ui/react"
import { FaRegHeart, FaCopy, FaXmark } from "react-icons/fa6"

export default function ColorCard({ colorObject}) {
	return (
		<GridItem
			px={{ base: 4, md: 4, lg: 6 }}
			py="4"
			display="flex"
			flexDirection={{ md: "column" }}
			alignItems={{ base: "center", md: "flex-start"}}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			gap="2"
			bgColor={colorObject.hex.value}
			color={colorObject.contrast.value}
		>
			<Heading size="md">{colorObject.name.value}</Heading>
			<ButtonGroup size="xs" variant="plain" ms="-1">
				<IconButton aria-label="Copy color" color={colorObject.contrast.value}>
					<FaCopy />
				</IconButton>
				<IconButton aria-label="Save color" color={colorObject.contrast.value}>
					<FaRegHeart />
				</IconButton>
				<IconButton aria-label="Remove color" color={colorObject.contrast.value}>
					<FaXmark />
				</IconButton>
			</ButtonGroup>
		</GridItem>
	)
}