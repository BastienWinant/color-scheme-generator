import { AuthUserContext } from "src/contexts/auth/AuthUserContext.js"
import { AuthUserData } from "src/contexts/auth/AuthUserData.js"

export function AuthUserProvider({ children }) {
	const auth = AuthUserData()
	return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
}