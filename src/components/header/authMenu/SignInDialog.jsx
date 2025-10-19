import { Button, CloseButton, Dialog, Portal, Fieldset, Field, Input } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input.jsx"
import { useState } from "react"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"

export default function SignInDialog({open, setOpen, switchAuth}) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { signIn } = useAuth()

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
								<Fieldset.Root size="lg">
									<Fieldset.Content>

										<Field.Root>
											<Field.Label>Email address</Field.Label>
											<Input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
										</Field.Root>

										<Field.Root>
											<Field.Label>Password</Field.Label>
											<PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
										</Field.Root>

									</Fieldset.Content>

									<Button type="submit" alignSelf="flex-start">
										Sign In
									</Button>
								</Fieldset.Root>
							</form>
						</Dialog.Body>
						<Dialog.Footer>
							No account yet?
							<Button variant="plain" p="0" onClick={switchAuth}>Sign up</Button>
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