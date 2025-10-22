import {
	Button,
	IconButton,
	CloseButton,
	Dialog,
	Portal,
	Stack
} from "@chakra-ui/react"
import SchemeNameEdit from "@/components/generator/saveSchemeDialog/SchemeNameEdit.jsx"
import SchemeSummaryCard from "@/components/generator/saveSchemeDialog/SchemeSummaryCard.jsx"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { useState } from "react"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import { toaster } from "@/components/ui/toaster.jsx"
import { writeColorSchemeData, deleteColorSchemeData } from "@/db_utils.js"

export default function SaveSchemeDialog({ saved, setSaved }) {
	const [open, setOpen] = useState(false)
	const [key, setKey] = useState("")
	const { authUser } = useAuth()
	const { colorScheme, setColorScheme } = useColorSchemeContext()

	const updateSchemeName = (name) => {
		setColorScheme(scheme => ({...scheme, name}))
	}

	/**
	 * Saves the current color scheme for the authenticated user.
	 *
	 * 1. Writes the user's color scheme data to the database.
	 * 2. Stores the generated database key in local state.
	 * 3. Marks the color scheme as successfully saved.
	 * 4. Displays a success notification to the user.
	 */
	const saveColorScheme = async () => {
		// Verify that a valid name has been provided
		if (!colorScheme.name || colorScheme.name === "") {
			toaster.create({
				description: "Invalid color scheme name", // User feedback message
				type: "error",
				duration: 2000,
			})

			return
		}

		try {
			const dbKey = await writeColorSchemeData(authUser.uid, colorScheme) // Save color scheme in DB and get its key
			setKey(dbKey) // Update local state with the DB key
			setSaved(true) // Flag the scheme as saved
			setOpen(false)
			localStorage.setItem("color-scheme-saved", JSON.stringify(true))

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
			localStorage.setItem("color-scheme-saved", JSON.stringify(false))

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
	const toggleSave = () => {
		if (!authUser) {
			toaster.create({
				description: "Sign in to save color scheme",
				type: "warning",
				duration: 2000,
			})
		} else {
			unsaveColorScheme()
		}
	}

	return (
		<Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
			{ (saved || !authUser) ?
				<IconButton
					variant="outline"
					size="md"
					aria-label={saved ? "Unsave color scheme" : "Save color scheme."}
					onClick={toggleSave}
				>
					{saved ? <FaHeart /> : <FaRegHeart />}
				</IconButton> :
				<Dialog.Trigger asChild>
					<IconButton
						variant="outline"
						size="md"
						aria-label="Save color scheme."
					>
						<FaRegHeart />
					</IconButton>
				</Dialog.Trigger>
			}
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Name your color scheme</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Stack gap="6">
								<SchemeNameEdit setName={ updateSchemeName } />
								<SchemeSummaryCard colorScheme={colorScheme} />
								<Button alignSelf="flex-end" onClick={saveColorScheme}>Save</Button>
							</Stack>
						</Dialog.Body>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}