import { Flex, Button } from "@chakra-ui/react";
import HexInput from "@/components/generator/form/HexInput.jsx";
import ModeInput from "@/components/generator/form/ModeInput.jsx";

export default function Form() {
	return (
		<form>
			<Flex
				direction="column"
			>
				{/*<HexInput />*/}
				<ModeInput />
				<Button type="submit">Generate new scheme</Button>
			</Flex>
		</form>
	)
}