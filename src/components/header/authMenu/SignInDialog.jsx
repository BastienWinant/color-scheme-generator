import { Button, CloseButton, Dialog, Portal, Fieldset, Field, Input, Text } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input.jsx"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"

export default function SignInDialog({open, setOpen, switchAuth}) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { signIn, authUser, authError, setAuthError } = useAuth()

	useEffect(() => {
		setEmail("")
		setPassword("")
		setAuthError(null)
	}, [authUser, open]);

	const handleSubmit = () => {
		signIn(email, password)
	}

	return (
		<Dialog.Root
			lazyMount
			open={open}
			onOpenChange={e => setOpen(e.open)}
			size="xs"
		>
			<Dialog.Trigger asChild>
				<Button variant="ghost">sign in</Button>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner px="4">
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Sign In</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<form action={handleSubmit}>
								<Fieldset.Root>
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

										<Field.Root
											required
											invalid={authError?.field === "password"}
											pb="5"
											position="relative"
										>
											<Field.Label>
												Password <Field.RequiredIndicator />
											</Field.Label>
											<PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
											<Field.ErrorText position="absolute" bottom="0">{authError?.message}</Field.ErrorText>
										</Field.Root>

									</Fieldset.Content>

									<Button type="submit">
										Sign In
									</Button>
								</Fieldset.Root>
							</form>
						</Dialog.Body>
						<Dialog.Footer>
							<Text textStyle="xs">No account yet?</Text>
							<Button
								variant="plain"
								size="xs"
								p="0"
								onClick={switchAuth}
							>Sign up</Button>
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