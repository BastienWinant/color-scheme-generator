import {
  Code,
  ColorPicker,
  HStack,
  Portal,
  Stack,
  parseColor,
} from "@chakra-ui/react"
import { useState } from "react"

export default function ColorInput() {
  const [value, setValue] = useState(parseColor("#eb5e41"))

  return (
		<ColorPicker.Root
			defaultValue={value}
			onValueChangeEnd={(e) => setValue(e.value)}
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