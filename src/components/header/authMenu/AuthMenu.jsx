import SignUpDialog from "@/components/header/authMenu/signUp/SignUpDialog.jsx";
import SignInDialog from "@/components/header/authMenu/signIn/SignInDialog.jsx";
import { HStack } from "@chakra-ui/react";
import {useState} from "react";

export default function AuthMenu() {
	const [signupOpen, setSignupOpen] = useState(false)
	const [loginOpen, setLoginOpen] = useState(false)
	return (
		<HStack>
			<SignUpDialog
				signupOpen={signupOpen}
				setSignupOpen={setSignupOpen}
			/>
			<SignInDialog
				loginOpen={loginOpen}
				setLoginOpen={setLoginOpen}
			/>
		</HStack>
	)
}