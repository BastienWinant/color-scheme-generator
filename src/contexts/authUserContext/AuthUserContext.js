import { createContext, useContext } from "react"

export const AuthUserContext = createContext({})

export const useAuthUserContext = () => useContext(AuthUserContext)