import { Outlet } from "react-router"
import { Stack, Flex } from "@chakra-ui/react"
import Header from "@/components/header/Header.jsx"

export default function Layout() {
	return (
		<Stack
			h="100vh"
			gap="0"
		>
			<Header />
			<Flex as="main" flexGrow="1">
				<Outlet />
			</Flex>
		</Stack>
	)
}