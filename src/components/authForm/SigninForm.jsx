import {
	Button,
	Field,
	Fieldset,
	Input
} from "@chakra-ui/react";

export default function SigninForm() {
	return (
		<form>
			<Fieldset.Root size="lg">
				<Fieldset.Content>
					<Field.Root required>
						<Field.Label>
							Email address
							<Field.RequiredIndicator />
						</Field.Label>
						<Input name="email" type="email" />
					</Field.Root>

					<Field.Root>
						<Field.Label>
							Password
							<Field.RequiredIndicator />
						</Field.Label>
						<Input name="password" type="password" />
					</Field.Root>
				</Fieldset.Content>

				<Button type="submit" alignSelf="flex-start">
					Sign In
				</Button>
			</Fieldset.Root>
		</form>
	)
}