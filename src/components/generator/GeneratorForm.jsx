import {
	Button,
	Field,
	Fieldset
} from "@chakra-ui/react"
import CountInput from "@/components/generator/CountInput.jsx"
import ModeInput from "@/components/generator/ModeInput.jsx"
import SeedInput from "@/components/generator/SeedInput.jsx"

export default function GeneratorForm() {
	return (
		<form>
			<Fieldset.Root size="lg" borderWidth="thin">
				<Fieldset.Content>
					<Field.Root>
						<Field.Label borderWidth="thin">Seed</Field.Label>
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