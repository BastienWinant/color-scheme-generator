import { AuthUserContext } from "@/contexts/auth/AuthUserContext.js"
import { AuthUserData } from "@/contexts/auth/AuthUserData.js"

export function AuthUserProvider({ children }) {
	const auth = AuthUserData()
	return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
}