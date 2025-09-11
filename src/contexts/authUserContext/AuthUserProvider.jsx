import { AuthUserContext } from "@/contexts/authUserContext/AuthUserContext.js"
import AuthUserData from "@/contexts/authUserContext/AuthUserData.js";

export const AuthUserProvider = ({children}) => {
	const authUserData = AuthUserData()
	return (
		<AuthUserContext value={authUserData}>{children}</AuthUserContext>
	)
}