import { useState, useEffect } from "react"

export default function AuthUserData() {
	const [authUser, setAuthUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	return {
		authUser,
		isLoading
	}
}