import { useState, useEffect } from "react"
import { auth } from "@/firebase.js"
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as authSignOut } from "firebase/auth";

export default function AuthUserData() {
	const [authUser, setAuthUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const clear = () => {
		setAuthUser(null);
		setIsLoading(false);
	}

	const handleAuthStateChanged = async user => {
		setIsLoading(true)

		if (!user) {
			clear();
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

	const signUp = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => console.log(userCredential))
			.catch(error => console.log(error))
	};

	const signIn = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => console.log(userCredential))
			.catch(error => console.log(error))
	};

	const signOut = () => authSignOut(auth);

	return {
		authUser,
		isLoading,
		signUp,
		signIn,
		signOut
	}
}