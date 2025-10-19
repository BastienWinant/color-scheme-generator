import { Group } from "@chakra-ui/react"
import SignInDialog from "@/components/header/authMenu/SignInDialog.jsx"
import SignUpDialog from "@/components/header/authMenu/SignUpDialog.jsx"
import { useState } from "react";

export default function AuthMenu() {
	const [signinOpen, setSigninOpen] = useState(false)
	const [signupOpen, setSignupOpen] = useState(false)

	const switchAuth = () => {
		setSigninOpen(prevVal => !prevVal)
		setSignupOpen(prevVal => !prevVal)
	}

	return (
		<Group>
			<SignInDialog open={signinOpen} setOpen={setSigninOpen} switchAuth={switchAuth} />
			<SignUpDialog open={signupOpen} setOpen={setSignupOpen} switchAuth={switchAuth} />
		</Group>
	)
}