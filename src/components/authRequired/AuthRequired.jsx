import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/contexts/authContext/authUserContext.js";
import {Spinner} from "@chakra-ui/react";

export default function AuthRequired() {
	const { authUser, isLoading } = useAuth();

	if (!isLoading && !authUser) {
		return <Navigate to="/" />;
	}

	return <>{isLoading ? <Spinner size="xl" /> : <Outlet />}</>
}