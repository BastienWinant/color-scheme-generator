import { Button, CloseButton, Dialog, Portal, Fieldset, Field, Input, Text } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input.jsx"
import {useEffect, useState} from "react"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"

export default function SignUpDialog({open, setOpen, switchAuth}) {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { signUp, authUser, authError, setAuthError } = useAuth()

	useEffect(() => {
		setUsername("")
		setEmail("")
		setPassword("")
		setAuthError(null)
	}, [authUser, open]);

	const handleSubmit = () => {
		signUp(email, password, username)
	}

	return (
		<Dialog.Root
			lazyMount
			open={open}
			onOpenChange={e => setOpen(e.open)}
			size="xs"
		>
			<Dialog.Trigger asChild>
				<Button variant="solid">sign up</Button>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner px="4">
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Sign Up</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<form action={handleSubmit}>
								<Fieldset.Root>
									<Fieldset.Content gap="2">

										<Field.Root
											required
											pb="5"
											position="relative"
										>
											<Field.Label>
												Username <Field.RequiredIndicator />
											</Field.Label>
											<Input name="username" value={username} onChange={e => setUsername(e.target.value)} />
										</Field.Root>

										<Field.Root
											required
											invalid={authError?.field === "email"}
											pb="5"
											position="relative"
										>
											<Field.Label>
												Email <Field.RequiredIndicator />
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
										Sign Up
									</Button>
								</Fieldset.Root>
							</form>
						</Dialog.Body>
						<Dialog.Footer>
							<Text textStyle="xs">Already have an account?</Text>
							<Button
								variant="plain"
								size="xs"
								p="0"
								onClick={switchAuth}
							>Sign in</Button>
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