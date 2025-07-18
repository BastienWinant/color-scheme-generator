import { auth } from "@/firebase.js";
import { AuthUserContext } from "./AuthUserContext";
import useFirebaseAuth from "./useFirebaseAuth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthUserProvider({ children }) {
	// initialize the auth object and start the auth state change listener
	const authObj = useFirebaseAuth();

	const signinEmailPassword = async (loginEmail, loginPassword) => {
		signInWithEmailAndPassword(auth, loginEmail, loginPassword)
				.then(userCredential => console.log(userCredential))
				.catch(error => console.log(error));
	}

	const signupEmailPassword = async (signupEmail, signupPassword) => {
		createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
				.then(userCredential => console.log(userCredential))
				.catch(error => console.log(error));
	}

	return (
			<AuthUserContext.Provider value={{authObj, signinEmailPassword, signupEmailPassword}}>
				{children}
			</AuthUserContext.Provider>
	);
}