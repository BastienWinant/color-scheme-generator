import { useState, useEffect } from "react"
import { auth } from "@/firebase.js"
import { onAuthStateChanged } from "firebase/auth";

export default function AuthUserData() {
	const [authUser, setAuthUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const handleAuthStateChanged = async user => {
		setIsLoading(true)

		if (!user) {
			setAuthUser(null)
			setIsLoading(false)
			return;
		}

		setAuthUser({
			uid: user.id,
			email: user.email
		});

		setIsLoading(false)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged)
		return () => unsubscribe()
	}, []);

	return {
		authUser,
		isLoading
	}
}