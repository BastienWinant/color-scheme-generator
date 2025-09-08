import { Stack, Field, Input, Button } from "@chakra-ui/react"
import ColorInput from "@/components/generator/form/ColorInput.jsx"

export default function GeneratorForm() {
	return (
		<form>
			<Stack borderWidth="thin">
				<ColorInput />
				<Button variant="solid">Submit</Button>
			</Stack>
		</form>
	)
}