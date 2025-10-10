import { IconButton, Menu, Portal } from "@chakra-ui/react"
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js"
import { FaUser } from "react-icons/fa6"

export default function UserMenu() {
	const { signOut } = useAuth()

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton variant="plain" size="xl">
          <FaUser />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content p="4">
            <Menu.Item value="new-file">New File...</Menu.Item>
            <Menu.Item value="new-win">New Window</Menu.Item>
            <Menu.Item value="open-file">Open File...</Menu.Item>
            <Menu.Item value="export">Export</Menu.Item>
						<Menu.Separator />
						<Menu.ItemGroup>
							<Menu.Item value="new-txt" onClick={signOut}>Sign Out</Menu.Item>
						</Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}