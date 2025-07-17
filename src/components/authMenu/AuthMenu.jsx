import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"

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
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
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