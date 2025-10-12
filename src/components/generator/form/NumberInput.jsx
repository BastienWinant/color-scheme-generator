import { Field, NumberInput, HStack, IconButton } from "@chakra-ui/react"
import { FaPlus, FaMinus } from "react-icons/fa6"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"

export default function CountInput() {
  const { count, setCount } = useColorSchemeContext()

  return (
    <Field.Root>
      <Field.Label>Count</Field.Label>
      <NumberInput.Root
        unstyled
        spinOnPress={false}
        w="full"
        borderWidth="thin"
        rounded="sm"
        value={count}
        onValueChange={e => setCount(e.value)}
				min="4"
				max="6"
      >
        <HStack gap="2" justifyContent="space-between">
          <NumberInput.DecrementTrigger asChild>
            <IconButton variant="plain" size="sm">
              <FaMinus />
            </IconButton>
          </NumberInput.DecrementTrigger>
          <NumberInput.ValueText textAlign="center" fontSize="md" minW="3ch" />
          <NumberInput.IncrementTrigger asChild>
            <IconButton variant="plain" size="sm">
              <FaPlus />
            </IconButton>
          </NumberInput.IncrementTrigger>
        </HStack>
      </NumberInput.Root>
    </Field.Root>
  )
}