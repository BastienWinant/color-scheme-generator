import { ButtonGroup, Button, IconButton, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { FaHeart } from "react-icons/fa6"
import GeneratorForm from "@/components/generator/GeneratorForm.jsx"

export default function GeneratorFormToggler() {
  return (
    <Drawer.Root placement={{ mdDown: "bottom", md: "end" }}>
      <ButtonGroup justifyContent="flex-end">
        <Drawer.Trigger asChild flexGrow={{base: 1, md: 0}}>
          <Button variant="outline" size="xl">
            Open Drawer
          </Button>
        </Drawer.Trigger>
        <IconButton variant="outline" size="xl">
          <FaHeart />
        </IconButton>
      </ButtonGroup>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Context>
              {(store) => (
                <Drawer.Body pt="6" spaceY="3">
                  <GeneratorForm />
                  <button onClick={() => store.setOpen(false)}>Close</button>
                </Drawer.Body>
              )}
            </Drawer.Context>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}