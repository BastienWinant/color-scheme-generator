import {
	Flex,
	LinkBox,
	LinkOverlay,
	Icon,
	Text,
	Stack,
	IconButton,
	Show
} from "@chakra-ui/react";
import AuthMenu from "@/components/authMenu/AuthMenu.jsx";
import { FaPalette, FaBars } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Header() {
	const [navExpanded, setNavExpanded] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		function trackWindowWidth() {
			setNavExpanded(false);
			setWindowWidth(window.innerWidth);
		}
		window.addEventListener("resize", trackWindowWidth)

		return () => window.removeEventListener("resize", trackWindowWidth)
	}, []);

	function toggleNav() {
		setNavExpanded(prevVal => !prevVal)
	}

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