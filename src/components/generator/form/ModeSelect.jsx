import { Select, createListCollection } from "@chakra-ui/react"
import {useEffect, useState} from "react"
import { nanoid } from "nanoid"

export default function ModeSelect() {
  const [mode, setMode] = useState([])

  useEffect(() => {
    console.log(mode)
  }, [mode])

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

const modes = createListCollection({
  items: [
    { label: "Monochrome", value: "monochrome" },
    { label: "Monochrome (dark)", value: "monochrome-dark" },
    { label: "Monochrome (light)", value: "monochrome-light" },
    { label: "Analogic", value: "analogic" },
    { label: "Complement", value: "complement" },
    { label: "Analogic-complement", value: "analogic-complement" },
    { label: "Triad", value: "triad" },
    { label: "Quad", value: "quad" }
  ],
})