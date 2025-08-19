import { Select, createListCollection } from "@chakra-ui/react"

export default function ModeInput() {
  return (
    <Select.Root collection={colorModes} size="md">
      <Select.HiddenSelect />
      <Select.Label>Select color mode</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select color mode" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {colorModes.items.map(colorMode => (
            <Select.Item item={colorMode} key={colorMode.value}>
              {colorMode.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}

const colorModes = createListCollection({
  items: [
    { label: "Monochrome", value: "monochrome" },
    { label: "Monochrome-dark", value: "monochrome-dark" },
    { label: "Monochrome-light", value: "monochrome-light" },
    { label: "Analogic", value: "analogic" },
    { label: "Complement", value: "complement" },
    { label: "Analogic-complement", value: "analogic-complement" },
    { label: "Triad", value: "triad" }
  ],
})
