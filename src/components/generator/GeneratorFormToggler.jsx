import { ButtonGroup, Button, IconButton, CloseButton, Drawer, Portal, Container } from "@chakra-ui/react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import GeneratorForm from "@/components/generator/form/GeneratorForm.jsx"
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js";
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js";
import { writeNewColorScheme, removeColorScheme } from "@/db_utils.js";
import { useState } from "react";

export default function GeneratorFormToggler() {
  const [colorSchemeKey, setColorSchemeKey] = useState(null)

  const { authUser} = useAuth();
  const { colorScheme, saved, setSaved } = useColorSchemeContext();

  const saveColorScheme = async () => {
    const key = await writeNewColorScheme(authUser.uid, colorScheme);
    setColorSchemeKey(key);
    setSaved(true);
  }

  const unsaveColorScheme = async () => {
    await removeColorScheme(authUser.uid, colorSchemeKey);
    setColorSchemeKey(null);
    setSaved(false);
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
          <IconButton
            variant="outline"
            size="lg"
            onClick={saved ? unsaveColorScheme : saveColorScheme}
            aria-label={saved ? "Unsave color scheme." : "Save color scheme."}
          >
            {saved ? <FaHeart /> : <FaRegHeart />}
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