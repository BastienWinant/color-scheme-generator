import SignUpDialog from "@/components/header/authMenu/signUp/SignUpDialog.jsx"
import SignInDialog from "@/components/header/authMenu/signIn/SignInDialog.jsx"
import { HStack } from "@chakra-ui/react"
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js"

export default function AuthMenu() {
	const { setSignupOpen, setLoginOpen } = useAuth()

	const switchAuthType = () => {
		setSignupOpen(prevVal => !prevVal)
		setLoginOpen(prevVal => !prevVal)
	}

	return (
		<HStack>
			<SignUpDialog
				switchAuthType={switchAuthType}
			/>
			<SignInDialog
				switchAuthType={switchAuthType}
			/>
		</HStack>
	)
}