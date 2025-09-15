import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import SignUpForm from "@/components/header/authMenu/signUp/SignUpForm.jsx";

export default function SignUpDialog() {
  return (
    <Dialog.Root size="sm">
      <Dialog.Trigger asChild>
        <Button variant="solid" size="md">
          Sign Up
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Sign Up</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <SignUpForm />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}