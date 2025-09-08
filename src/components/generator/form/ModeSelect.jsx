import { Select } from "@chakra-ui/react"
import { nanoid } from "nanoid"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"

export default function ModeSelect() {
  const { mode, setMode, modes } = useColorSchemeContext()

  return (
    <Select.Root
      collection={modes}
      value={mode}
      onValueChange={e => setMode(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Label>Select mode</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select mode" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {modes.items.map(item => (
            <Select.Item item={item} key={nanoid()}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}