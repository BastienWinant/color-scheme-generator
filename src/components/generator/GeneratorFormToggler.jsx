import { ButtonGroup, Button, IconButton, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import GeneratorForm from "@/components/generator/form/GeneratorForm.jsx"

export default function GeneratorFormToggler() {
  return (
    <Drawer.Root placement={{ mdDown: "bottom", md: "end" }}>
      <ButtonGroup justifyContent="flex-end" px="6" py="4" gap="4">
        <Drawer.Trigger asChild flexGrow={{base: 1, md: 0}}>
          <Button variant="outline" size="lg">
            New Palette
          </Button>
        </Drawer.Trigger>
        <IconButton variant="outline" size="lg">
          <FaRegHeart />
        </IconButton>
      </ButtonGroup>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Context>
              {store => (
                <Drawer.Body py="6" spaceY="3">
                  <GeneratorForm closeDrawer={() => store.setOpen(false)} />
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