import { Tabs } from "@chakra-ui/react"
import { FaUserPlus, FaUserCheck } from "react-icons/fa6";
import SignUpForm from "@/components/authDialog/forms/SignUpForm.jsx";

export default function AuthTabs() {
  return (
    <Tabs.Root defaultValue="signup" fitted>
      <Tabs.List>
        <Tabs.Trigger value="signup">
          <FaUserPlus />
          Sign Up
        </Tabs.Trigger>
        <Tabs.Trigger value="signin">
          <FaUserCheck />
          Sign In
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="signup">
        <SignUpForm />
      </Tabs.Content>
      <Tabs.Content value="signin">sign in form</Tabs.Content>
    </Tabs.Root>
  )
}