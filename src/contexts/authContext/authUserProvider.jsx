import { auth } from "@/firebase.js";
import { AuthUserContext } from "./AuthUserContext";
import useFirebaseAuth from "./useFirebaseAuth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthUserProvider({ children }) {
	// initialize the auth object and start the auth state change listener
	const authObj = useFirebaseAuth();

	const signinEmailPassword = async (loginEmail, loginPassword) => {
		const userCredential = signInWithEmailAndPassword(auth, loginEmail, loginPassword);
	}

	const signupEmailPassword = async (signupEmail, signupPassword) => {
		const userCredential = createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
	}

	return (
			<AuthUserContext.Provider value={{authObj, signinEmailPassword, signupEmailPassword}}>
				{children}
			</AuthUserContext.Provider>
	);
}