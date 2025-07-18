import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as authSignOut } from "firebase/auth";

export default function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// define behavior at every change of the auth status
	const authStateChanged = async (user) => {
		setIsLoading(true);

		// user logged out
		if (!user) {
			setAuthUser(null);
			setIsLoading(false);
			return;
		}

		// user logged in
		setAuthUser({
			uid: user.uid,
			email: user.email,
		});

		setIsLoading(false);
	};

	// start the auth state change listener
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, authStateChanged);
		return () => unsubscribe();
	}, []);

	const signinEmailPassword = async (loginEmail, loginPassword) => {
		signInWithEmailAndPassword(auth, loginEmail, loginPassword)
				.catch(error => console.log(error));
	}

	const signupEmailPassword = async (signupEmail, signupPassword) => {
		createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
				.catch(error => console.log(error));
	}

	const signOut = async () => {
		authSignOut(auth).catch(error => console.log(error));
	}

	return {
		authUser,
		isLoading,
		signinEmailPassword,
		signupEmailPassword
	};
}