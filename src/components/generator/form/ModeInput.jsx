import { Portal, Select, createListCollection } from "@chakra-ui/react"

export default function ModeInput() {
  return (
    <Select.Root collection={colorModes} size="sm">
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
      <Select.Positioner>
        <Select.Content>
          {colorModes.items.map((item) => (
            <Select.Item item={item} key={item.value}>
              {item.label}
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
  ],
})