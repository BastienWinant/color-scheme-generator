import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
} from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"

export default function SignUpForm() {
  return (
		<form>
			<Fieldset.Root size="md">
				<Stack>
					<Fieldset.Legend>Contact details</Fieldset.Legend>
					<Fieldset.HelperText>
						Please provide your contact details below.
					</Fieldset.HelperText>
				</Stack>

				<Fieldset.Content>
					<Field.Root required>
						<Field.Label>
							Username <Field.RequiredIndicator />
						</Field.Label>
						<Input name="username" />
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							Email address <Field.RequiredIndicator />
						</Field.Label>
						<Input name="email" type="email" />
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							Password <Field.RequiredIndicator />
						</Field.Label>
						<PasswordInput />
					</Field.Root>

					<Field.Root required>
						<Field.Label>
							Confirm password <Field.RequiredIndicator />
						</Field.Label>
						<PasswordInput />
					</Field.Root>

				</Fieldset.Content>

				<Button type="submit">
					Sign Up
				</Button>
			</Fieldset.Root>
		</form>
  )
}