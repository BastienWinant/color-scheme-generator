import { Flex, For } from "@chakra-ui/react";
import { nanoid } from 'nanoid';

export default function Palette({colorScheme}) {
	return (
		<>
			{colorScheme &&
				<For each={colorScheme.colors}>
					{colorObj => (
						<Flex
							key={nanoid()}
							flexGrow="1"
							align="center"
							justifyContent="space-between"
							bg={colorObj.hex.value}
							color={colorObj.contrast.value}
						>
							<p>{colorObj.name.value}</p>
							<p>{colorObj.hex.clean}</p>
						</Flex>
					)}
				</For>
			}
		</>
	)
}