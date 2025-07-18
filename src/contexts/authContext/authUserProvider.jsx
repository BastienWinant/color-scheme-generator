import { AuthUserContext } from "./AuthUserContext";
import useFirebaseAuth from "./useFirebaseAuth";

export default function AuthUserProvider({ children }) {
	// initialize the auth object and start the auth state change listener
	const auth = useFirebaseAuth();

	return (
			<AuthUserContext.Provider value={auth}>
				{children}
			</AuthUserContext.Provider>
	);
}