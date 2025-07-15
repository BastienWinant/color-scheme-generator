import { Outlet } from "react-router";
import Header from "@/components/header/Header.jsx";

export default function Layout() {
	return (
			<>
				<Header />
				<Outlet />
			</>
	)
}