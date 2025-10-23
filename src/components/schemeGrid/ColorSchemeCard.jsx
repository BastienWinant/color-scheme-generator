import { Card, Heading, Avatar, AvatarGroup, For, Stack, DataList, Text, Button, IconButton } from "@chakra-ui/react"
import { FaRegTrashCan } from "react-icons/fa6"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"
import { deleteColorSchemeData } from "@/db_utils.js"
import { useNavigate } from "react-router"

export default function ColorSchemeCard({ databaseKey, schemeObject }) {
	const { authUser } = useAuth()
	const { setColorScheme } = useColorSchemeContext()
	const navigate = useNavigate();

	const stats = [
		{ label: "Seed Color", value: schemeObject.seed.hex.value, diff: -12, helpText: "Till date" },
		{ label: "Count", value: schemeObject.count, diff: 12, helpText: "Last 30 days" },
		{ label: "Mode", value: schemeObject.mode, diff: 4.5, helpText: "Last 30 days" },
	]

	const deleteColorScheme = () => {
		deleteColorSchemeData(authUser.uid, databaseKey)
	}

	const openInGenerator = () => {
		setColorScheme(schemeObject)
		localStorage.setItem("color-scheme-saved", JSON.stringify(true))
		navigate("/")
	}

	return (
		<Card.Root size="md" gap="2">
			<Card.Header>
				<Heading size="lg">{schemeObject.name}</Heading>
			</Card.Header>
			<Card.Body color="fg.muted">
				<Stack gap="8">
					<AvatarGroup gap="0" spaceX="-3" size="md">
						<For each={schemeObject.colors}>
							{(item, index) => (
								<Avatar.Root key={index}>
									<Avatar.Fallback name={item.name.value} />
									<Avatar.Image src={item.image.bare} />
								</Avatar.Root>
							)}
						</For>
					</AvatarGroup>
					<DataList.Root orientation="horizontal">
						{stats.map((item) => (
							<DataList.Item key={item.label}>
								<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
								<DataList.ItemValue><Text fontWeight="semibold">{item.value}</Text></DataList.ItemValue>
							</DataList.Item>
						))}
					</DataList.Root>
				</Stack>
			</Card.Body>
			<Card.Footer justifyContent="flex-end">
				<IconButton variant="outline" onClick={ deleteColorScheme }>
					<FaRegTrashCan />
				</IconButton>
				<Button onClick={ openInGenerator }>Open in Generator</Button>
			</Card.Footer>
		</Card.Root>
	)
}