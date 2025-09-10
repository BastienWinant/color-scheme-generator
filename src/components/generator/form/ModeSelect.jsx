import { NativeSelect } from "@chakra-ui/react"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"

export default function ModeSelect() {
  const { mode, setMode } = useColorSchemeContext()

  return (
    <NativeSelect.Root>
      <NativeSelect.Field
        placeholder="Select option"
        value={mode}
        onChange={e => setMode(e.currentTarget.value)}
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}