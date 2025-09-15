import { Container, LinkBox, LinkOverlay, Icon } from "@chakra-ui/react";
import { Link } from "react-router"
import { FaPalette } from "react-icons/fa6";
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js";
import AuthMenu from "@/components/header/authMenu/AuthMenu.jsx";
import UserMenu from "@/components/header/userMenu/UserMenu.jsx";

export default function Header() {
	const { authUser } = useAuth();

	return (
		<Container
			as="header"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			shadow="sm"
			zIndex="1"
		>
			<LinkBox>
				<Icon size="2xl">
					<FaPalette />
				</Icon>
				<LinkOverlay asChild>
					<Link to="/" />
				</LinkOverlay>
			</LinkBox>
			{ authUser ?
				<UserMenu /> :
				<AuthMenu />
			}
		</Container>
	)
}