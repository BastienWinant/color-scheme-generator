import { NativeSelect } from "@chakra-ui/react"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"

export default function ModeSelect() {
  const { mode, modes, setMode } = useColorSchemeContext()

  const options = modes.map(option => <option key={option.value} value={option.value}>{option.label}</option>)

  return (
    <NativeSelect.Root>
      <NativeSelect.Field
        placeholder="Select option"
        value={mode}
        onChange={e => setMode(e.currentTarget.value)}
      >
        {options}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}