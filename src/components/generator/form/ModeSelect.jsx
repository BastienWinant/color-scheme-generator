import { Select } from "@chakra-ui/react"
import {useColorSchemeContext} from "@/contexts/colorSchemeContext/ColorSchemeContext.js"

export default function ModeSelect() {
  const { modes } = useColorSchemeContext()

  return (
    <Select.Root collection={modes}>
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
            <Select.Item item={item} key={item.value}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}