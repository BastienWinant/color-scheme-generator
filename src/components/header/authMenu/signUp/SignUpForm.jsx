import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input.jsx";
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js";

export default function SignUpForm() {
	const { signUp } = useAuth();

	const handleSubmit = formData => {
		const username = formData.get('username');
		const email = formData.get('email');
		const password = formData.get('password');

		signUp(username, email, password);
	}

  return (
		<form action={handleSubmit}>
			<Fieldset.Root size="lg">
				<Stack>
					<Fieldset.Legend>Contact details</Fieldset.Legend>
					<Fieldset.HelperText>
						Please provide your contact details below.
					</Fieldset.HelperText>
				</Stack>

				<Fieldset.Content>
					<Field.Root>
						<Field.Label>Username</Field.Label>
						<Input name="username" />
					</Field.Root>

					<Field.Root>
						<Field.Label>Email address</Field.Label>
						<Input name="email" type="email" />
					</Field.Root>

					<Field.Root>
						<Field.Label>Password</Field.Label>
						<PasswordInput name="password" />
					</Field.Root>

				</Fieldset.Content>

				<Button type="submit">
					Sign Up
				</Button>
			</Fieldset.Root>
		</form>
  )
}