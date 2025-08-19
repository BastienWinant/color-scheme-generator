import { VStack, Button, Field, Input } from "@chakra-ui/react";
import HexInput from "@/components/generator/form/HexInput.jsx";
import ModeInput from "@/components/generator/form/ModeInput.jsx";

export default function Form() {
	return (
		<form>
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