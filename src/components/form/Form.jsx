import { VStack, Button } from "@chakra-ui/react";
import HexInput from "@/components/form/HexInput.jsx";
import ModeInput from "@/components/form/ModeInput.jsx";

export default function Form() {
	return (
		<form>
			<VStack>
				<HexInput />
				<ModeInput />
				<Button type="submit">Get color scheme</Button>
			</VStack>
		</form>
	)
}