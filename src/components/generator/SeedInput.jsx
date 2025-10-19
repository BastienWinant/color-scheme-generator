import {
	Code,
	ColorPicker,
	HStack,
	Portal,
	Stack,
	parseColor,
} from "@chakra-ui/react"
import { useState } from "react"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"

export default function SeedInput() {
	const { seedColor, setSeedColor } = useColorSchemeContext()

	return (
		<ColorPicker.Root
			defaultValue={parseColor(seedColor)}
			onValueChangeEnd={e => setSeedColor(e.valueAsString)}
		>
			<ColorPicker.HiddenInput />
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