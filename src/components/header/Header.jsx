import { Box, Container, HStack, Icon } from "@chakra-ui/react"
import AuthMenu from "src/components/header/authMenu/AuthMenu.jsx"
import UserMenu from "src/components/header/userMenu/UserMenu.jsx"
import { FaPalette } from "react-icons/fa6"
import { useAuth } from "src/contexts/auth/AuthUserContext.js"

export default function Header() {
	const { authUser } = useAuth()

	return (
		<Box as="header">
			<Container
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				py="3"
				shadow="md"
				zIndex="1"
			>
				<HStack>
					<Icon size="2xl">
						<FaPalette />
					</Icon>
				</HStack>
				{ authUser ? <UserMenu /> : <AuthMenu /> }
			</Container>
		</Box>
	)
}