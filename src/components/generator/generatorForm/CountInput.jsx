import { HStack, IconButton, NumberInput } from "@chakra-ui/react"
import { LuMinus, LuPlus } from "react-icons/lu"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"

export default function CountInput() {
	const { count, setCount } = useColorSchemeContext()

	return (
		<NumberInput.Root
			min={4}
			max={6}
			unstyled
			spinOnPress={false}
			w="full"
			value={count}
			onValueChange={(value) => setCount(value.valueAsNumber)}
			borderWidth="thin"
			rounded="sm"
		>
			<HStack gap="2" justifyContent="space-between">
				<NumberInput.DecrementTrigger asChild>
					<IconButton variant="surface" size="sm">
						<LuMinus />
					</IconButton>
				</NumberInput.DecrementTrigger>
				<NumberInput.ValueText textAlign="center" fontSize="md" minW="3ch" />
				<NumberInput.IncrementTrigger asChild>
					<IconButton variant="surface" size="sm">
						<LuPlus />
					</IconButton>
				</NumberInput.IncrementTrigger>
			</HStack>
		</NumberInput.Root>
	)
}