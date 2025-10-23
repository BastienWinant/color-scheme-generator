import { useEffect, useState } from "react"
import { auth } from "@/firebase.js"
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	signOut as authSignOut
} from "firebase/auth"

export const AuthUserData = () => {
	const [authUser, setAuthUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const signUp = async (email, password, username) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			await updateProfile(userCredential.user, { displayName: username })
		} catch (e) {
			console.log(e)
		}
	}

	const signIn = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (e) {
			console.log(e)
		}
	}

	const signOut = async () => await authSignOut(auth)

	const handleAuthStateChange = async (user) => {
		setIsLoading(true)

		if (!user) {
			setAuthUser(null)
			setIsLoading(false)
			return
		}

		setAuthUser({
			uid: user.uid,
			email: user.email,
			username: user.displayName
		})

		setIsLoading(false)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange)
		return () => unsubscribe()
	}, []);

	return {
		authUser,
		isLoading,
		signUp,
		signIn,
		signOut
	}
}