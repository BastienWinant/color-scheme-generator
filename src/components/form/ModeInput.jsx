import { Portal, Select, createListCollection } from "@chakra-ui/react"

export default function ModeInput() {
  return (
    <Select.Root collection={colorModes} size="sm" width="320px">
      <Select.HiddenSelect />
      <Select.Label>Select framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select framework" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {colorModes.items.map((mode) => (
              <Select.Item item={mode} key={mode.value}>
                {mode.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const colorModes = createListCollection({
  items: [
    { label: "Monochrome", value: "monochrome" },
    { label: "Monochrome-dark", value: "monochrome-dark" },
    { label: "Monochrome-light", value: "monochrome-light" },
    { label: "Analogic", value: "analogic" },
  ],
})