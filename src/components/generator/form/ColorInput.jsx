import { ColorPicker, HStack, parseColor } from "@chakra-ui/react"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"

export default function ColorInput() {
	const { color, setColor } = useColorSchemeContext()

  return (
		<ColorPicker.Root
			defaultValue={parseColor(color)}
			onValueChangeEnd={e => setColor(e.valueAsString)}
		>
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