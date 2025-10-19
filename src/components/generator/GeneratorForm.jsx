import {
	Button,
	Field,
	Fieldset
} from "@chakra-ui/react"
import CountInput from "@/components/generator/CountInput.jsx"
import ModeInput from "@/components/generator/ModeInput.jsx"
import SeedInput from "@/components/generator/SeedInput.jsx"
import {useColorSchemeContext} from "@/contexts/colorScheme/ColorSchemeContext.js"

export default function GeneratorForm() {
	const { seedColor, mode, count, setColorScheme } = useColorSchemeContext()

	const getColorScheme = async () => {
		const base_url = "https://www.thecolorapi.com"
		const endpoint = "scheme"

		const urlColor = seedColor.replaceAll(" ", "")

		const url = `${base_url}/${endpoint}?rgb=${urlColor}&format=json&mode=${mode}&count=${count}`

		const response = await fetch(url)
		const data = await response.json()

		setColorScheme(data)
		localStorage.setItem("color-scheme", JSON.stringify(data))
	}

	return (
		<form action={getColorScheme}>
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