import { ButtonGroup, Button, IconButton, CloseButton, Drawer, Portal, Container } from "@chakra-ui/react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import GeneratorForm from "@/components/generator/form/GeneratorForm.jsx"
import { ref, set } from "firebase/database"
import { database } from "@/firebase.js"
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js";
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js";

export default function GeneratorFormToggler() {
  const { authUser} = useAuth();
  const { colorScheme } = useColorSchemeContext();

  const saveColorScheme = () => {
    set(ref(database, 'color-schemes/' + authUser.uid), colorScheme);
  }

  return (
    <Drawer.Root placement={{ mdDown: "bottom", md: "end" }}>
      <Container py="4">
        <ButtonGroup justifyContent="flex-end" gap="4" w="full">
          <Drawer.Trigger asChild flexGrow={{ base: 1, md: 0 }}>
            <Button variant="outline" size="lg">
              New Palette
            </Button>
          </Drawer.Trigger>
          <IconButton variant="outline" size="lg" onClick={saveColorScheme}>
            <FaRegHeart />
          </IconButton>
        </ButtonGroup>
      </Container>
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