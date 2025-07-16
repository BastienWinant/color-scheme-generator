import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase.js";

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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, authStateChanged);
		return () => unsubscribe();
	}, []);

	return {
		authUser,
		isLoading,
	};
}