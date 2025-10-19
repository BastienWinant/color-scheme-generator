import { NativeSelect } from "@chakra-ui/react"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"

export default function ModeInput() {
	const { mode, setMode } = useColorSchemeContext()

	return (
		<NativeSelect.Root size="sm">
			<NativeSelect.Field
				placeholder="Select option"
				value={mode}
				onChange={e => setMode(e.currentTarget.value)}
			>
				<option value="monochrome">Monochrome</option>
				<option value="monochrome-dark">Monochrome (light)</option>
				<option value="monochrome-light">Monochrome (dark)</option>
				<option value="analogic">Analogic</option>
				<option value="complement">Complement</option>
				<option value="analogic-complement">Analogic-Complement</option>
				<option value="triad">Triad</option>
				<option value="quad">Quad</option>
			</NativeSelect.Field>
			<NativeSelect.Indicator />
		</NativeSelect.Root>
	)
}