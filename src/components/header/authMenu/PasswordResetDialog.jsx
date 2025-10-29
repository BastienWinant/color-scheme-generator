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
import { useState } from "react";
import { useAuth } from "@/contexts/auth/AuthUserContext.js";


export default function PasswordResetDialog({ open, setOpen }) {
	const [email, setEmail] = useState("")
	const [success, setSuccess] = useState(false)
	const { resetPassword, authError, setAuthError } = useAuth()

	const handleSubmit = async () => {
		setAuthError(false)
		const reset = await resetPassword(email)

		if (reset) {
			setSuccess(true)
		}
	}

	const clearForm = e => {
		setAuthError(false)
		setEmail("")
		setSuccess(false)
		setOpen(e.open)
	}

	return (
		<Dialog.Root
			lazyMount
			open={open}
			onOpenChange={clearForm}
			size="xs"
		>
			<Dialog.Trigger asChild>
				<Button variant="plain" size="xs">
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
									<Field.Root
										required
										invalid={authError?.field === "email"}
										pb="5"
										position="relative"
									>
										<Field.Label>
											Email address <Field.RequiredIndicator />
										</Field.Label>
										<Input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
										{success && <Field.HelperText position="absolute" bottom="0">Password reset email sent!</Field.HelperText>}
										<Field.ErrorText position="absolute" bottom="0">{authError?.message}</Field.ErrorText>
									</Field.Root>
								</Fieldset.Content>
							</Fieldset.Root>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline">{success ? 'Close' : 'Cancel' }</Button>
							</Dialog.ActionTrigger>
							{!success && <Button onClick={handleSubmit}>Reset password</Button>}
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