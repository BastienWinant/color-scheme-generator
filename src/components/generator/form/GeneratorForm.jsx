import { Stack, Field, Input, Button } from "@chakra-ui/react"
import ColorInput from "@/components/generator/form/ColorInput.jsx"
import ModeSelect from "@/components/generator/form/ModeSelect.jsx"
import CountInput from "@/components/generator/form/NumberInput.jsx";

export default function GeneratorForm() {
	return (
		<form>
			<Stack>
				<ColorInput />
				<ModeSelect />
				<CountInput />
				<Button variant="solid">Submit</Button>
			</Stack>
		</form>
	)
}