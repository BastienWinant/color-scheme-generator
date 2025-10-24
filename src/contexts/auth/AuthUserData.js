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
	const [authError, setAuthError] = useState(null)

	const signUp = async (email, password, username) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			await updateProfile(userCredential.user, { displayName: username })
		} catch (e) {
			console.log(e.code)
			console.log(e.message)
		}
	}

	const signIn = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (e) {
			if (e.code === 'auth/user-not-found') {
				setAuthError({field: "email", message: "The user does not exist."})
			} else if (e.code === 'auth/wrong-password') {
				setAuthError({field: "password", message: "Wrong password."})
			} else {
				setAuthError({message: "An error occurred. Please try again."})
			}
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
		signOut,
		authError,
		setAuthError
	}
}