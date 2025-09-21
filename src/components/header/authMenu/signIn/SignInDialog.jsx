import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import SignInForm from "@/components/header/authMenu/signIn/SignInForm.jsx";

export default function SignInDialog({loginOpen, setLoginOpen}) {
  return (
    <Dialog.Root
      size="sm"
      lazyMount
      open={loginOpen}
      onOpenChange={e => setLoginOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="md">
          Sign In
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
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