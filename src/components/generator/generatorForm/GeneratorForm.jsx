import {
	Field,
	Fieldset
} from "@chakra-ui/react"
import CountInput from "@/components/generator/generatorForm/CountInput.jsx"
import ModeInput from "@/components/generator/generatorForm/ModeInput.jsx"
import SeedInput from "@/components/generator/generatorForm/SeedInput.jsx"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"
import SaveSchemeDialog from "@/components/generator/generatorForm/saveSchemeDialog/SaveSchemeDialog.jsx"

export default function GeneratorForm({ resetSaveStatus, closeDrawer }) {
	const { getColorScheme } = useColorSchemeContext()

	const handleClick = () => {
		resetSaveStatus()
		getColorScheme()
		closeDrawer()
	}

	return (
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

			<SaveSchemeDialog handleClick={handleClick} />
		</Fieldset.Root>
	)
}