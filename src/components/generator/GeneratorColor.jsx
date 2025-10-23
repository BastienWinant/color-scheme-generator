import { GridItem, Heading, ButtonGroup, IconButton, Clipboard } from "@chakra-ui/react"
import { FaHeart, FaRegHeart, FaXmark } from "react-icons/fa6"
import { useColorSchemeContext } from "src/contexts/colorScheme/ColorSchemeContext.js"
import { useAuth } from "src/contexts/auth/AuthUserContext.js"
import { toaster } from "src/components/ui/toaster.jsx"
import { writeColorData, deleteColorData } from "src/db_utils.js"

export default function GeneratorColor({ colorObject, saved }) {
	const { colorScheme, setColorScheme } = useColorSchemeContext()
	const { authUser } = useAuth()

	/**
	 * Removes a color from the local state's color scheme
	 */
	const deleteColor = () => {
		setColorScheme(prevScheme => {
			const colors = prevScheme.colors.filter(
				color => color.hex.clean !== colorObject.hex.clean
			); // Filter the color scheme's color array

			const count = prevScheme.count - 1; // update the color count

			return { ...prevScheme, colors, count };
		});
	};

	/**
	 * Saves the current color for the authenticated user.
	 *
	 * 1. Writes the user's color data to the database.
	 * 2. Displays a success notification to the user.
	 */
	const saveColor = async () => {
		try {
			await writeColorData(authUser.uid, colorObject) // Save color in DB with HEX code as key

			toaster.create({
				description: "Color saved successfully", // User feedback message
				type: "success",
				duration: 1500,
			})
		} catch {
			toaster.create({
				description: "The color could not be saved.", // User feedback message
				type: "error",
				duration: 1500,
			})
		}
	}

	/**
	 * Unsaves the current color for the authenticated user.
	 *
	 * 1. Deletes the user's color data from the database.
	 * 2. Displays a success notification to the user.
	 */
	const unsaveColor = async () => {
		try {
			await deleteColorData(authUser.uid, colorObject.hex.clean) // Delete color in DB using HEX value

			toaster.create({
				description: "Color unsaved successfully", // User feedback message
				type: "success",
				duration: 1500,
			})
		} catch {
			toaster.create({
				description: "The color could not be unsaved.", // User feedback message
				type: "error",
				duration: 1500,
			})
		}
	}

	/**
	 * Dispatch function calls depending on user auth status
	 * and local state.
	 */
	const toggleSave = async () => {
		if (!authUser) {
			toaster.create({
				description: "User must be registered to save colors", // User feedback message
				type: "warning",
				duration: 2000,
			})
		} else if (saved) {
			unsaveColor()
		} else {
			saveColor()
		}
	}

	return (
		<GridItem
			px={{ base: 4, md: 4, lg: 6 }}
			py="4"
			display="flex"
			flexDirection={{ md: "column" }}
			alignItems={{ base: "center", md: "flex-start"}}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			gap="2"
			bgColor={colorObject.hex.value}
			color={colorObject.contrast.value}
		>
			<Heading size={{ base: "lg", md: "md", lg: "lg" }}>{colorObject.name.value}</Heading>
			<ButtonGroup size={{ base: "sm", md: "xs", lg: "sm", xl: "md" }} variant="plain" ms="-2">
				<Clipboard.Root value={colorObject.hex.value}>
					<Clipboard.Trigger asChild>
						<IconButton color={colorObject.contrast.value}>
							<Clipboard.Indicator />
						</IconButton>
					</Clipboard.Trigger>
				</Clipboard.Root>
				<IconButton
					aria-label="Save color"
					color={colorObject.contrast.value}
					onClick={ toggleSave }
				>
					{ saved ? <FaHeart /> : <FaRegHeart /> }
				</IconButton>
				<IconButton
					aria-label="Remove color"
					color={colorObject.contrast.value}
					onClick={ deleteColor }
					disabled={ parseInt(colorScheme.colors.length) === 1 }
				>
					<FaXmark />
				</IconButton>
			</ButtonGroup>
		</GridItem>
	)
}