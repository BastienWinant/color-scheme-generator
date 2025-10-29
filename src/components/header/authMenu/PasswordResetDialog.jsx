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


export default function PasswordResetDialog() {
	const [email, setEmail] = useState("")
	const { resetPassword, authError } = useAuth()

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
										<Field.ErrorText position="absolute" bottom="0">{authError?.message}</Field.ErrorText>
									</Field.Root>
								</Fieldset.Content>
							</Fieldset.Root>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</Dialog.ActionTrigger>
							<Button onClick={() => resetPassword(email)}>Reset password</Button>
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