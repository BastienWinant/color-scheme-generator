import { Flex } from "@chakra-ui/react";
import GeneratorFormToggler from "@/components/generator/GeneratorFormToggler.jsx"
import GeneratorPalette from "@/components/generator/palette/GeneratorPalette.jsx"

export default function Generator() {
	return (
		<Flex direction={{base: "column-reverse"}}>
			<GeneratorFormToggler />
			<GeneratorPalette />
		</Flex>
	)
}