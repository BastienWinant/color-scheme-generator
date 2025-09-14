import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import AuthTabs from "@/components/authDialog/AuthTabs.jsx";

export default function AuthDialog() {
  return (
    <Dialog.Root
      size="xs"
      placement="top"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="md">
          Sign Up/Sign In
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body borderWidth="medium">
              <AuthTabs />
            </Dialog.Body>
            {/*<Dialog.Footer>*/}
            {/*  <Dialog.ActionTrigger asChild>*/}
            {/*    <Button variant="outline">Cancel</Button>*/}
            {/*  </Dialog.ActionTrigger>*/}
            {/*  <Button>Save</Button>*/}
            {/*</Dialog.Footer>*/}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}