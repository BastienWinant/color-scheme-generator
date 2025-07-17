import {
	Button,
	Field,
	Fieldset,
	Input
} from "@chakra-ui/react";

export default function SignupForm() {
	return (
		<form>
			<Fieldset.Root size="lg">
				<Fieldset.Content>
					<Field.Root required>
						<Field.Label>
							Username
							<Field.RequiredIndicator />
						</Field.Label>
						<Input name="email" type="text" />
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							Email address
							<Field.RequiredIndicator />
						</Field.Label>
						<Input name="email" type="email" />
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							Password
							<Field.RequiredIndicator />
						</Field.Label>
						<Input name="password" type="password" />
					</Field.Root>
				</Fieldset.Content>

				<Button type="submit" alignSelf="flex-start">
					Sign Up
				</Button>
			</Fieldset.Root>
		</form>
	)
}