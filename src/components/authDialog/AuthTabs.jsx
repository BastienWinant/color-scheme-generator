import { Tabs } from "@chakra-ui/react"
import { LuFolder, LuUser } from "react-icons/lu"

export default function AuthTabs() {
  return (
    <Tabs.Root defaultValue="signup" fitted>
      <Tabs.List>
        <Tabs.Trigger value="signup">
          <LuUser />
          Sign Up
        </Tabs.Trigger>
        <Tabs.Trigger value="signin">
          <LuFolder />
          Sign In
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="signup">sign up form</Tabs.Content>
      <Tabs.Content value="signin">sign in form</Tabs.Content>
    </Tabs.Root>
  )
}