import { Card, Heading, HStack, IconButton } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster.jsx"
import { FaRegClipboard, FaHeart, FaRegHeart, FaXmark } from "react-icons/fa6"
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js"
import { writeNewColor } from "@/db_utils.js"
import { useAuth } from "@/contexts/authUserContext/AuthUserContext.js"

export default function ColorCard({color}) {
	const { authUser } = useAuth()
	const { colorScheme, setColorScheme } = useColorSchemeContext()

	const removeColor = () => {
		let colors = colorScheme.colors
		colors = colors.filter(item => item.hex.clean != color.hex.clean)

		setColorScheme(prevScheme => ({
			...prevScheme,
			colors
		}))
	}

	const saveColor = async () => {
		await writeNewColor(authUser.uid, color)
		toaster.info({
      title: "Success!",
      description: "Color saved successfully",
      // action: {
      //   label: "Undo",
      //   onClick: unsaveColorScheme,
      // },
      duration: 3000,
    })
	}

	const copyColor = () => {
		navigator.clipboard.writeText(color.hex.clean)
		toaster.info({
      title: "Copied!",
      description: "Color copied to clipboard",
      // action: {
      //   label: "Undo",
      //   onClick: unsaveColorScheme,
      // },
      duration: 3000,
    })
	}

	return (
    <Card.Root
			flexShrink="1"
			flexGrow="1"
			size="sm"
			flexDirection={{ base: "row", lg: "column-reverse" }}
			alignItems={{ base: "center" }}
			justifyContent={{ base: "space-between" }}
			gap={{ lg: 4 }}
			py={{ base: 0, lg: 6 }}
			rounded="0"
			border="0"
			bg={ color.hex.value }
			color={ color.contrast.value }
		>
			<Card.Header py="0">
				<Heading size="md" textAlign="center">{color.name.value}</Heading>
			</Card.Header>
			<Card.Body
				py="0"
				px={{ lg: "0" }}
				alignItems={{ base: "flex-end", lg: "stretch" }}
				justifyContent={{ base: "flex-end" }}
			>
				<HStack>
					<IconButton
						variant="plain"
						size="sm"
						color={ color.contrast.value }
						onClick={copyColor}
					>
						<FaRegClipboard />
					</IconButton>
					<IconButton
						variant="plain"
						size="sm"
						color={ color.contrast.value }
						onClick={saveColor}
					>
						<FaRegHeart />
					</IconButton>
					<IconButton
						variant="plain"
						size="sm"
						color={ color.contrast.value }
						onClick={removeColor}
					>
						<FaXmark />
					</IconButton>
				</HStack>
			</Card.Body>
    </Card.Root>
  )
}