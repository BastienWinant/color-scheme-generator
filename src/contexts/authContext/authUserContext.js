import { createContext, useContext } from "react";

// track user auth status and auth loading status
export const AuthUserContext = createContext({
	authUser: null,
	isLoading: true,
});

export const useAuth = () => useContext(AuthUserContext);