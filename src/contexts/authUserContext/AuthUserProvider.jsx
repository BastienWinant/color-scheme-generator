import {AuthUserContext} from "@/contexts/authUserContext/AuthUserContext.js"

export default function AuthUserProvider({children}) {
	const authUserContext = {}
	return (
		<AuthUserContext value={authUserContext}>{children}</AuthUserContext>
	)
}