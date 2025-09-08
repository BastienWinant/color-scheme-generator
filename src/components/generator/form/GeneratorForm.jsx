import { Stack, Field, Input, Button } from "@chakra-ui/react"
import ColorInput from "@/components/generator/form/ColorInput.jsx"
import ModeSelect from "@/components/generator/form/ModeSelect.jsx";

export default function GeneratorForm() {
	return (
		<form>
			<Stack borderWidth="thin">
				<ColorInput />
				<ModeSelect />
				<Button variant="solid">Submit</Button>
			</Stack>
		</form>
	)
}