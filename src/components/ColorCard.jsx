import { GridItem, Heading, ButtonGroup, IconButton } from "@chakra-ui/react"
import { FaHeart, FaRegHeart, FaCopy, FaXmark } from "react-icons/fa6"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import { toaster } from "@/components/ui/toaster.jsx"
import { writeColorData, deleteColorData } from "@/db_utils.js"
import { useState } from "react"

export default function ColorCard({ colorObject}) {
	const [saved, setSaved] = useState(false)
	const { colorScheme, setColorScheme } = useColorSchemeContext()
	const { authUser } = useAuth()

	const deleteColor = () => {
		setColorScheme(prevScheme => {
			const colors = prevScheme.colors.filter(
				color => color.hex.clean !== colorObject.hex.clean
			);
			const count = prevScheme.count - 1;
			return { ...prevScheme, colors, count };
		});
	};


	const copyColor = () => {
		navigator.clipboard.writeText(colorObject.hex.value)

		toaster.create({
			description: "Color copied to clipboard",
			type: "info",
			duration: 1500,
		})
	}

	const saveColor = async () => {
		await writeColorData(authUser.uid, colorObject)
		setSaved(true)

		toaster.create({
			description: "Color saved successfully",
			type: "success",
			duration: 1500,
		})
	}

	const unsaveColor = async () => {
		await deleteColorData(authUser.uid, colorObject.hex.clean)
		setSaved(false)

		toaster.create({
			description: "Color unsaved successfully",
			type: "success",
			duration: 1500,
		})
	}

	const toggleSave = async () => {
		if (!authUser) {
			toaster.create({
				description: "User must be registered to save colors",
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
			<Heading size="md">{colorObject.name.value}</Heading>
			<ButtonGroup size="xs" variant="plain" ms="-1">
				<IconButton
					aria-label="Copy color"
					color={colorObject.contrast.value}
					onClick={ copyColor }
				>
					<FaCopy />
				</IconButton>
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
					disabled={ colorScheme.colors.length == 1 }
				>
					<FaXmark />
				</IconButton>
			</ButtonGroup>
		</GridItem>
	)
}