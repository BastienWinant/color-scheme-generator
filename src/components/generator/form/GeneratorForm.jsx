import { Stack, Button } from "@chakra-ui/react"
import ColorInput from "@/components/generator/form/ColorInput.jsx"
import ModeSelect from "@/components/generator/form/ModeSelect.jsx"
import CountInput from "@/components/generator/form/NumberInput.jsx";

export default function GeneratorForm({closeDrawer}) {
	const handleSubmit = () => {
		closeDrawer()
	}

	return (
		<form action={handleSubmit}>
			<Stack gap="6">
				<ColorInput />
				<ModeSelect />
				<CountInput />
				<Button type="submit" variant="solid">Submit</Button>
			</Stack>
		</form>
	)
}