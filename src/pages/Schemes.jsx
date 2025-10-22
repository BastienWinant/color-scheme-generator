import { Box } from "@chakra-ui/react"
import RedirectPrompt from "@/components/schemeGrid/RedirectPrompt.jsx"

export default function Schemes() {
	return (
		<Box position="relative" w="full" bg="bg.muted">
			<RedirectPrompt />
		</Box>
	)
}