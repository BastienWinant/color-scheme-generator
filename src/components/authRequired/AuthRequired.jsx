import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/contexts/authContext/authUserContext.js";
export default function AuthRequired() {
	const { authObj } = useAuth();

	if (true) {
		return <Navigate to="/" />
	}

	return <Outlet />
}