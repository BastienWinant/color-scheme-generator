import { ButtonGroup, Button, IconButton, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { FaHeart } from "react-icons/fa6"

export default function Toggler() {
  return (
    <Drawer.Root placement={{ mdDown: "bottom", md: "end" }} size={{ md: "md" }}>
      <ButtonGroup justifyContent="flex-end">
        <Drawer.Trigger flexGrow={{base: "1", md: "0"}} asChild>
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
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}