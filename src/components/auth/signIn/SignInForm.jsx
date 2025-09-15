import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
} from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"

export default function SignInForm() {
  return (
		<form>
			<Fieldset.Root size="lg">
				<Stack>
					<Fieldset.Legend>Contact details</Fieldset.Legend>
					<Fieldset.HelperText>
						Please provide your contact details below.
					</Fieldset.HelperText>
				</Stack>

				<Fieldset.Content>

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
					Sign In
				</Button>
			</Fieldset.Root>
		</form>
  )
}