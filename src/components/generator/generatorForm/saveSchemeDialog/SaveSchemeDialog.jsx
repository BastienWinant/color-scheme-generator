import {
	Button,
	CloseButton,
	Dialog,
	Portal,
	Stack
} from "@chakra-ui/react"
import SchemeNameEdit from "@/components/generator/generatorForm/saveSchemeDialog/SchemeNameEdit.jsx"
import SchemeSummaryCard from "@/components/generator/generatorForm/saveSchemeDialog/SchemeSummaryCard.jsx"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"

export default function SaveSchemeDialog({ handleClick }) {
	const { colorScheme, setColorScheme } = useColorSchemeContext()

	console.log(colorScheme)

	const updateSchemeName = (name) => {
		setColorScheme(scheme => ({...scheme, name}))
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button variant="solid">Save Scheme</Button>
			</Dialog.Trigger>
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
								<Button alignSelf="flex-end">Save</Button>
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