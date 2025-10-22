import { ButtonGroup, Button, CloseButton, Drawer, Portal, IconButton } from "@chakra-ui/react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { useState } from "react"
import GeneratorForm from "@/components/generator/GeneratorForm.jsx"
import { toaster } from "@/components/ui/toaster.jsx"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"
import { writeColorSchemeData, deleteColorSchemeData } from "@/db_utils.js"

export default function Generator() {
	const [saved, setSaved] = useState(false)
	const [key, setKey] = useState("")
	const { authUser } = useAuth()
	const { colorScheme } = useColorSchemeContext()

	/**
	 * Saves the current color scheme for the authenticated user.
	 *
	 * 1. Writes the user's color scheme data to the database.
	 * 2. Stores the generated database key in local state.
	 * 3. Marks the color scheme as successfully saved.
	 * 4. Displays a success notification to the user.
	 */
	const saveColorScheme = async () => {
		try {
			const dbKey = await writeColorSchemeData(authUser.uid, colorScheme) // Save color scheme in DB and get its key
			setKey(dbKey) // Update local state with the DB key
			setSaved(true) // Flag the scheme as saved

			toaster.create({
				description: "Color scheme saved successfully", // User feedback message
				type: "success",
				duration: 1500,
			})
		} catch {
			toaster.create({
				description: "The color scheme could not be saved.", // User feedback message
				type: "error",
				duration: 1500,
			})
		}
	}

	/**
	 * Unsaves the current color scheme for the authenticated user
	 *
	 * 1. Deletes the user's color scheme data from the database.
	 * 2. Updates the status in the local state.
	 * 3. Displays a success notification to the user.
	 */
	const unsaveColorScheme = async () => {
		try {
			await deleteColorSchemeData(authUser.uid, key) // Delete color scheme from DB using its key
			setSaved(false) // Flag the scheme as unsaved

			toaster.create({
				description: "Color scheme unsaved successfully", // User feedback message
				type: "success",
				duration: 1500,
			})
		} catch {
			toaster.create({
				description: "The color scheme could not be unsaved.", // User feedback message
				type: "error",
				duration: 1500,
			})
		}
	}

	/**
	 * Dispatches the click event depending on user authentication status
	 * and local saved state.
	 */
	const handleClick = () => {
		if (!authUser) {
			toaster.create({
				description: "User must be registered to save color schemes",
				type: "warning",
				duration: 2000,
			})
		} else if (saved) {
			unsaveColorScheme()
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
									<GeneratorForm
										resetSaveStatus={() => setSaved(false)}
										closeDrawer={() => store.setOpen(false)} />
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