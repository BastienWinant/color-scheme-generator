import { Stack, Field, Input } from "@chakra-ui/react"
import ColorInput from "@/components/generator/form/ColorInput.jsx"

export default function GeneratorForm() {
	return (
		<form>
			<Stack borderWidth="thin">
				<ColorInput />
			</Stack>
		</form>
	)
}