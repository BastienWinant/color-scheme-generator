import { Flex } from "@chakra-ui/react";
import Toggler from "@/components/generator/Toggler.jsx";

export default function Generator() {
	return (
		<Flex
			direction={{base: "column-reverse"}}
		>
			<Toggler />
		</Flex>
	)
}