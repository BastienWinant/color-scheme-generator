import { useAuth } from "src/contexts/auth/AuthUserContext.js"
import { useNavigate, Outlet } from "react-router"
import { useEffect } from "react";

export default function AuthRequired() {
	const { authUser, isLoading } = useAuth()
	const navigate = useNavigate()

	/**
	 * Redirects to the home page if the user is unauthenticated
	 */
	useEffect(() => {
		if (!isLoading && !authUser) {
			navigate('/')
		}
	}, [authUser, isLoading]);

	return (!authUser) ? <h1>Loading...</h1> : <Outlet />
}