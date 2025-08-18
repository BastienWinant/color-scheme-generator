import { Outlet } from "react-router";
import { Grid } from "@chakra-ui/react"
import Header from "@/components/header/Header.jsx";

export default function Layout() {
	return (
		<Grid
			templateColumns="1fr"
			templateRows="5em 1fr"
			minH="100vh"
		>
			<Header />
			<Outlet />
		</Grid>
	)
}