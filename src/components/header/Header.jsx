import { Flex, LinkBox, LinkOverlay, Icon, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router"
import { FaPalette } from "react-icons/fa6";
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js";
import SignUpDialog from "@/components/auth/signUp/SignUpDialog.jsx";
import SignInDialog from "@/components/auth/signIn/SignInDialog.jsx";

export default function Header() {
	const { authUser, signOut } = useAuth();

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
			{ authUser ?
				<Button onClick={signOut}>Sign Out</Button> :
				<HStack>
					<SignUpDialog />
					<SignInDialog />
				</HStack>
			}
		</Flex>
	)
}