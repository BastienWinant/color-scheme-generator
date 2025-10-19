import { Button, Menu, Portal } from "@chakra-ui/react"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"

export default function UserMenu() {
	const { signOut } = useAuth()

	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Button variant="outline" _focus={{ outline: 0}}>Edit</Button>
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