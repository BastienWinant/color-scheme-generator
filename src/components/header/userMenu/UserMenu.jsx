import { Button, Menu, Portal } from "@chakra-ui/react"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import { FaCircleUser } from "react-icons/fa6"

export default function UserMenu() {
	const { authUser, signOut } = useAuth()

	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Button variant="plain" _focus={{ outline: 0}}>
					<FaCircleUser />
					{ authUser.username }
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.ItemGroup>
							<Menu.Item value="generator">generator</Menu.Item>
							<Menu.Item value="schemes">schemes</Menu.Item>
							<Menu.Item value="colors">colors</Menu.Item>
						</Menu.ItemGroup>
						<Menu.Separator />
						<Menu.ItemGroup>
							<Menu.Item value="sign-out" onClick={signOut}>sign out</Menu.Item>
						</Menu.ItemGroup>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	)
}