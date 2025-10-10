import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react"
import SignInForm from "@/components/header/authMenu/signIn/SignInForm.jsx";
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js"

export default function SignInDialog({switchAuthType}) {
  const { loginOpen, setLoginOpen } = useAuth()

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
              <Text textStyle="xs">Don't have an account yet?</Text>
              <Button size="xs" variant="plain" px="0" onClick={switchAuthType}>Sign Up</Button>
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