import { useState, useEffect } from "react"
import { auth } from "@/firebase.js"
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	updateProfile
} from "firebase/auth";

export default function AuthUserData() {
	const [authUser, setAuthUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [signupOpen, setSignupOpen] = useState(false)
	const [loginOpen, setLoginOpen] = useState(false)

	const clear = () => {
		setAuthUser(null)
		setIsLoading(false)
	}

	const handleAuthStateChanged = async user => {
		setIsLoading(true)

		if (!user) {
			clear();
			return;
		}

		setAuthUser({
			uid: user.uid,
			username: user.email,
			email: user.email
		});

		setIsLoading(false)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged)
		return () => unsubscribe()
	}, []);

	const signUp = async (username, email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(userCredential.user, { displayName: username });
		} catch (error) {
			console.log(error)
		}
	};

	const signIn = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log(error)
		}
	};

	const signOut = () => authSignOut(auth);

	return {
		authUser,
		isLoading,
		signUp,
		signIn,
		signOut,
		signupOpen,
		loginOpen,
		setSignupOpen,
		setLoginOpen
	}
}