import { Field, NumberInput, HStack, IconButton } from "@chakra-ui/react"
import { FaPlus, FaMinus } from "react-icons/fa6"

export default function CountInput() {
  return (
    <Field.Root>
      <Field.Label>Count</Field.Label>
      <NumberInput.Root
        defaultValue="3"
        unstyled
        spinOnPress={false}
        w="full"
        borderWidth="thin"
        rounded="md"
      >
        <HStack gap="2" justifyContent="space-between">
          <NumberInput.DecrementTrigger asChild>
            <IconButton variant="outline" size="sm">
              <FaMinus />
            </IconButton>
          </NumberInput.DecrementTrigger>
          <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
          <NumberInput.IncrementTrigger asChild>
            <IconButton variant="outline" size="sm">
              <FaPlus />
            </IconButton>
          </NumberInput.IncrementTrigger>
        </HStack>
      </NumberInput.Root>
    </Field.Root>
  )
}