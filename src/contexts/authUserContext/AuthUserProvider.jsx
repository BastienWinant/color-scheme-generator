import { AuthUserContext } from "@/contexts/authUserContext/AuthUserContext.js"
import AuthUserData from "@/contexts/authUserContext/AuthUserData.js";

export const AuthUserProvider = ({children}) => {
	const auth = AuthUserData()
	return (
		<AuthUserContext value={auth}>{children}</AuthUserContext>
	)
}