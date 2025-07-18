import {
	Button,
	Field,
	Fieldset,
	Input
} from "@chakra-ui/react";
import { useAuth } from "@/contexts/authContext/authUserContext.js";

export default function SigninForm() {
	const { signupEmailPassword } = useAuth();

	function handleSubmit(event) {
		event.preventDefault();
		const formEl = event.currentTarget;
		const formData = new FormData(formEl);

		const email = formData.get("email");
		const password = formData.get("password");

		signupEmailPassword(email, password);

		formEl.reset();
	}

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<Fieldset.Root size="lg">
				<Fieldset.Content>
					<Field.Root required>
						<Field.Label>
							Email address
							<Field.RequiredIndicator />
						</Field.Label>
						<Input name="email" type="email" autoFocus />
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