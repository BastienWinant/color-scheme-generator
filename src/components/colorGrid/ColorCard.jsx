import { Box, IconButton, Card, Image, DataList } from "@chakra-ui/react"
import { FaRegTrashCan } from "react-icons/fa6"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import { deleteColorData } from "@/db_utils.js"

export default function ColorCard({colorObject}) {
	const { authUser } = useAuth()

	const stats = [
		{ label: "hex", value: colorObject.hex.value, diff: -12 },
		{ label: "rgb", value: colorObject.rgb.value, diff: 12 },
		{ label: "hsl", value: colorObject.hsl.value, diff: 4.5 },
	]

	const deleteColor = () => {
		deleteColorData(authUser.uid, colorObject)
	}

	return (
		<Card.Root flexDirection="row" overflow="hidden">
			<Image
				objectFit="cover"
				maxW="200px"
				src={colorObject.image.bare}
				alt="Caffe Latte"
			/>
			<Box w="full">
				<Card.Header>
					<Card.Title mb="2">{colorObject.name.value}</Card.Title>
				</Card.Header>
				<Card.Body>
					<DataList.Root>
						{stats.map((item) => (
							<DataList.Item key={item.label}>
								<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
								<DataList.ItemValue>{item.value}</DataList.ItemValue>
							</DataList.Item>
						))}
					</DataList.Root>
				</Card.Body>
				<Card.Footer justifyContent="flex-end">
					<IconButton variant="outline" onClick={ deleteColor }>
						<FaRegTrashCan />
					</IconButton>
				</Card.Footer>
			</Box>
		</Card.Root>
	)
}