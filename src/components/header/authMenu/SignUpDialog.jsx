import { Button, CloseButton, Dialog, Portal, Fieldset, Field, Input, Text } from "@chakra-ui/react"
import { PasswordInput } from "src/components/ui/password-input.jsx"
import { useState } from "react"
import { useAuth } from "src/contexts/auth/AuthUserContext.js"

export default function SignUpDialog({open, setOpen, switchAuth}) {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { signUp } = useAuth()

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
								<Fieldset.Root size="lg">
									<Fieldset.Content>
										<Field.Root>
											<Field.Label>Username</Field.Label>
											<Input name="username" value={username} onChange={e => setUsername(e.target.value)} />
										</Field.Root>

										<Field.Root>
											<Field.Label>Email address</Field.Label>
											<Input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
										</Field.Root>

										<Field.Root>
											<Field.Label>Password</Field.Label>
											<PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
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