import { ButtonGroup, Button, CloseButton, Drawer, Portal, IconButton } from "@chakra-ui/react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { useState } from "react"
import GeneratorForm from "@/components/generator/GeneratorForm.jsx"
import { toaster } from "@/components/ui/toaster.jsx"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"
import {writeColorSchemeData} from "@/db_utils.js"

export default function Generator() {
	const [saved, setSaved] = useState(false)
	const { authUser } = useAuth()
	const { colorScheme } = useColorSchemeContext()

	const saveColorScheme = async () => {
		await writeColorSchemeData(authUser.uid, colorScheme)
		setSaved(true)
		toaster.create({
			description: "Color scheme saved successfully",
			type: "success",
			duration: 1500,
		})
	}

	const handleClick = () => {
		if (!authUser) {
			toaster.create({
				description: "User must be registered to save color schemes",
				type: "warning",
				duration: 2000,
			})
		} else if (saved) {
			setSaved(false)
			toaster.create({
				description: "Color scheme unsaved successfully",
				type: "success",
				duration: 1500,
			})
		} else {
			saveColorScheme()
		}
	}

	return (
		<Drawer.Root placement={{ base: "bottom", md: "end" }} size={{ md: "xs" }}>
			<ButtonGroup w={{ base: "full", md: "64" }}>
				<Drawer.Trigger asChild flexGrow="1">
					<Button variant="outline" size="sm">
						new color scheme
					</Button>
				</Drawer.Trigger>
				<IconButton
					variant="outline"
					size="sm"
					aria-label={saved ? "Unsave color scheme" : "Save color scheme."}
					onClick={handleClick}
				>
					{saved ? <FaHeart /> : <FaRegHeart />}
				</IconButton>
			</ButtonGroup>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>Drawer Title</Drawer.Title>
						</Drawer.Header>
						<Drawer.Context>
							{store => (
								<Drawer.Body>
									<GeneratorForm closeDrawer={() => store.setOpen(false)} />
								</Drawer.Body>
							)}
						</Drawer.Context>
						<Drawer.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Drawer.CloseTrigger>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	)
}