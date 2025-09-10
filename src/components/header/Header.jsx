import { Flex, LinkBox, LinkOverlay, Icon } from "@chakra-ui/react";
import { Link } from "react-router"
import { FaPalette } from "react-icons/fa6";

export default function Header() {
	return (
		<Flex
			as="header"
			align="center"
			justify="space-between"
			shadow="lg"
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
		</Flex>
	)
}