import { Flex, LinkBox, LinkOverlay, Icon } from "@chakra-ui/react";
import { Link } from "react-router"
import { FaPalette } from "react-icons/fa6";
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js";
import AuthDialog from "@/components/authDialog/AuthDialog.jsx";

export default function Header() {
	const { authUser } = useAuth();

	return (
		<Flex
			as="header"
			align="center"
			justify="space-between"
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
			{ authUser ? authUser.email : <AuthDialog /> }
		</Flex>
	)
}