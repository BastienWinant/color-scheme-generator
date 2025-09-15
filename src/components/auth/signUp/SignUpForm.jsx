import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react"

export default function SignUpForm() {
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
						<Field.Label>Username</Field.Label>
						<Input name="username" />
					</Field.Root>

					<Field.Root>
						<Field.Label>Email address</Field.Label>
						<Input name="email" type="email" />
					</Field.Root>

				</Fieldset.Content>

				<Button type="submit">
					Sign Up
				</Button>
			</Fieldset.Root>
		</form>
  )
}