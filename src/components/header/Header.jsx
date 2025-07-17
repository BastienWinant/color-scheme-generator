import {
	Flex,
	LinkBox,
	LinkOverlay,
	Icon,
	Text
} from "@chakra-ui/react";
import AuthMenu from "@/components/authMenu/AuthMenu.jsx";
import { FaPalette } from "react-icons/fa6";
import { Link } from "react-router";

export default function Header() {
	return (
		<Flex
				as="header"
				align="center"
				justify="space-between"
				borderWidth="medium"
				h="16"
				px="4"
		>
			<LinkBox
				display="flex"
				alignItems="center"
				gap="2"
			>
				<Icon size="xl">
					<FaPalette />
				</Icon>
				<LinkOverlay asChild>
					<Link to="/">
						<Text fontWeight="semibold">ShadeMaker</Text>
					</Link>
				</LinkOverlay>
			</LinkBox>
			<AuthMenu />
		</Flex>
	)
}