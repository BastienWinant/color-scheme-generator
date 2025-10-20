import {
	Button,
	Field,
	Fieldset
} from "@chakra-ui/react"
import CountInput from "@/components/generator/CountInput.jsx"
import ModeInput from "@/components/generator/ModeInput.jsx"
import SeedInput from "@/components/generator/SeedInput.jsx"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"

export default function GeneratorForm({closeDrawer}) {
	const { getColorScheme } = useColorSchemeContext()

	const handleSubmit = () => {
		getColorScheme()
		closeDrawer()
	}

	return (
		<form action={handleSubmit}>
			<Fieldset.Root size="lg">
				<Fieldset.Content gap="10">
					<Field.Root>
						<Field.Label>Seed</Field.Label>
						<SeedInput />
					</Field.Root>

					<Field.Root>
						<Field.Label>Count</Field.Label>
						<CountInput />
					</Field.Root>

					<Field.Root>
						<Field.Label>Mode</Field.Label>
						<ModeInput />
					</Field.Root>
				</Fieldset.Content>

				<Button type="submit">
					Submit
				</Button>
			</Fieldset.Root>
		</form>
	)
}