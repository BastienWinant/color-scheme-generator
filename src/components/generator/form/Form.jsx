import { VStack, Button, Field, Input } from "@chakra-ui/react";
import HexInput from "@/components/generator/form/HexInput.jsx";
import ModeInput from "@/components/generator/form/ModeInput.jsx";
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js";

export default function Form() {
	const { setColorScheme } = useColorSchemeContext()

	function handleSubmit(formData) {
		const hex = formData.get('hex')
		const mode =  formData.get('mode')

		fetch(`https://www.thecolorapi.com/scheme?rgb=${hex}&mode=${mode}&format=json`)
			.then(res => res.json())
			.then(data => {
				localStorage.setItem("color-scheme", JSON.stringify(data));
				setColorScheme(data)
			})
	}

	return (
		<form action={handleSubmit}>
			<VStack
				direction="column"
				alignItems="stretch"
				gap="6"
				mb="2"
			>
				<HexInput />
				<ModeInput />
				<Button type="submit">Generate new scheme</Button>
			</VStack>
		</form>
	)
}