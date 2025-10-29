import {
	Button,
	CloseButton,
	Dialog,
	Portal,
	Field,
	Fieldset,
	Input,
	Stack
} from "@chakra-ui/react"


export default function PasswordResetDialog() {
	return (
		<Dialog.Root lazyMount size="xs">
			<Dialog.Trigger asChild>
				<Button variant="plain" size="sm">
					forgot password?
				</Button>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner px="4">
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Reset Password</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Fieldset.Root>
								<Stack>
									<Fieldset.HelperText>
										Please provide your account email below.
									</Fieldset.HelperText>
								</Stack>

								<Fieldset.Content gap="2">
									<Field.Root>
										<Field.Label>Email address</Field.Label>
										<Input name="email" type="email" />
									</Field.Root>
								</Fieldset.Content>
							</Fieldset.Root>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</Dialog.ActionTrigger>
							<Button>Save</Button>
						</Dialog.Footer>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}