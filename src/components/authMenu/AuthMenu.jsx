import {
	Button,
	CloseButton,
	Dialog,
	Portal,
	Tabs,
	Text
} from "@chakra-ui/react";
import SigninForm from "@/components/authForm/SigninForm.jsx";
import SignupForm from "@/components/authForm/SignupForm.jsx";

export default function AuthMenu() {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button variant="solid" size="sm">
					Sign up / Sign in
				</Button>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content w="90vw" maxW="xl">
						<Dialog.Header>
							<Dialog.Title>User account</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Tabs.Root defaultValue="members" variant="line" fitted>
								<Tabs.List>
									<Tabs.Trigger value="members">
										<Text fontWeight="semibold">Sign In</Text>
									</Tabs.Trigger>
									<Tabs.Trigger value="projects">
										<Text fontWeight="semibold">Sign Up</Text>
									</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="members"><SigninForm /></Tabs.Content>
								<Tabs.Content value="projects"><SignupForm /></Tabs.Content>
							</Tabs.Root>
						</Dialog.Body>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}