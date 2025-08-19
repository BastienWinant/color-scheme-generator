import { ColorPicker, HStack, parseColor } from "@chakra-ui/react"

export default function HexInput() {
  return (
    <ColorPicker.Root defaultValue={parseColor("#eb5e41")} size="md">
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <HStack>
            <ColorPicker.EyeDropper size="xs" variant="outline" />
            <ColorPicker.Sliders />
          </HStack>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker.Root>
  )
}