import {
  ColorPicker,
  HStack,
  parseColor,
} from "@chakra-ui/react"
import { useState } from "react"

export default function ColorInput() {
  const [color, setColor] = useState(parseColor("#eb5e41"))

  return (
		<ColorPicker.Root
			defaultValue={color}
			onValueChangeEnd={(e) => setColor(e.color)}
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