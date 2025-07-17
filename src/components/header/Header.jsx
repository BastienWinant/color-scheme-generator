import {
	Flex,
	Stack,
	IconButton,
	Show
} from "@chakra-ui/react";
import AuthMenu from "@/authMenu/AuthMenu.jsx";
import { FaPalette, FaBars } from "react-icons/fa6";
import { useState, useEffect } from "react";

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
		>
			<IconButton>
				<FaPalette />
			</IconButton>
			<IconButton
					aria-label="Expand nav menu"
					hideFrom="md"
					onClick={toggleNav}
			>
				<FaBars />
			</IconButton>
			<Show when={navExpanded || (windowWidth >= 768)}>
				<Stack
						direction={{base: "column", md: "row"}}
						position={{base: "absolute", md: "static"}}
						top="0"
						right="0"
						border="2px solid red"
				>
					<AuthMenu />
				</Stack>
			</Show>
		</Flex>
	)
}