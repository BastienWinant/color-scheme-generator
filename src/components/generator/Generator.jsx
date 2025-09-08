import { Flex } from "@chakra-ui/react";
import GeneratorFormToggler from "@/components/generator/GeneratorFormToggler.jsx";

export default function Generator() {
	return (
		<Flex direction={{base: "column-reverse"}}>
			<GeneratorFormToggler />
		</Flex>
	)
}