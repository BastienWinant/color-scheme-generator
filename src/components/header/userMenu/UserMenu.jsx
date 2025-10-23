import { Button, Menu, Portal } from "@chakra-ui/react"
import { useAuth } from "src/contexts/auth/AuthUserContext.js"
import { FaCircleUser } from "react-icons/fa6"
import { useNavigate } from "react-router"

export default function UserMenu() {
	const { authUser, signOut } = useAuth()
	const navigate = useNavigate()

	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Button variant="outline" _focus={{ outline: 0}}>
					<FaCircleUser />
					{ authUser.username }
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.ItemGroup>
							<Menu.Item value="generator" onClick={() => navigate("/")}>generator</Menu.Item>
							<Menu.Item value="schemes" onClick={() => navigate("schemes")}>schemes</Menu.Item>
							<Menu.Item value="colors" onClick={() => navigate("colors")}>colors</Menu.Item>
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