import SignUpDialog from "@/components/header/authMenu/signUp/SignUpDialog.jsx";
import SignInDialog from "@/components/header/authMenu/signIn/SignInDialog.jsx";
import { HStack } from "@chakra-ui/react";

export default function AuthMenu() {
	return (
		<HStack>
			<SignUpDialog />
			<SignInDialog />
		</HStack>
	)
}