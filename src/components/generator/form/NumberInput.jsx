import { Field, NumberInput } from "@chakra-ui/react"

export default function CountInput() {
  return (
    <Field.Root>
      <Field.Label>Enter Number</Field.Label>
      <NumberInput.Root defaultValue="5">
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
    </Field.Root>
  )
}