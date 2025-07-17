import { Button, CloseButton, Dialog, Portal, Tabs } from "@chakra-ui/react";

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
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Dialog Title</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Tabs.Root defaultValue="members" variant="subtle" fitted border="2px solid red;">
								<Tabs.List>
									<Tabs.Trigger value="members">
										Sign In
									</Tabs.Trigger>
									<Tabs.Trigger value="projects">
										Sign Up
									</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="members">sign in form</Tabs.Content>
								<Tabs.Content value="projects">sign up form</Tabs.Content>
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