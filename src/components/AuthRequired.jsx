import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import { useNavigate, Outlet } from "react-router"
import {useEffect} from "react";

export default function AuthRequired() {
	const { authUser, isLoading } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isLoading && !authUser) {
			navigate('/')
		}
	}, [authUser, isLoading]);

	return (!authUser) ? <h1>Loading...</h1> : <Outlet />
}