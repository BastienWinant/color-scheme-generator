import {Box, Container, HStack, Icon} from "@chakra-ui/react"
import AuthMenu from "@/components/header/authMenu/AuthMenu.jsx"
import UserMenu from "@/components/header/userMenu/UserMenu.jsx"
import { FaPalette } from "react-icons/fa6"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"

export default function Header() {
	const { authUser } = useAuth()

	return (
		<Box as="header">
			<Container
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				py="3"
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