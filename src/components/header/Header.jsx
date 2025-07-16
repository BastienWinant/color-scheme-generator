import {
	Box,
	Button,
	Dialog,
} from "@chakra-ui/react";
import SignupDialog from "@/components/signupDialog/SignupDialog.jsx";
import SigninDialog from "@/components/signinDialog/SigninDialog.jsx";

export default function Header() {
	return (
			<Box as="header" borderWidth="medium">
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<Button variant="outline">
							sign up
						</Button>
					</Dialog.Trigger>
					<SignupDialog />
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<Button variant="outline">
							sign in
						</Button>
					</Dialog.Trigger>
					<SigninDialog />
				</Dialog.Root>
			</Box>
	)
}