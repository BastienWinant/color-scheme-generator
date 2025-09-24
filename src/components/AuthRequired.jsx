import {useEffect} from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js";

export default function AuthRequired() {
	const { authUser, isLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!authUser && !isLoading) {
			navigate("/")
		}
	}, [authUser, isLoading]);

	return authUser ? <Outlet /> : <p>loading...</p>
}