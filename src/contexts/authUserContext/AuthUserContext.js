import { createContext, useContext } from "react"

export const AuthUserContext = createContext({
	authUser: null,
	isLoading: true
})

export const useAuthUserContext = () => useContext(AuthUserContext)