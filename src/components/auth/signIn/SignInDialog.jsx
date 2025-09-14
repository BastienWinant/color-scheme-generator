import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import SignInForm from "@/components/auth/signIn/SignInForm.jsx";

export default function SignInDialog() {
  return (
    <Dialog.Root size="sm">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="md">
          Sign In
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="90vw">
            <Dialog.Header>
              <Dialog.Title>Sign In</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <SignInForm />
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