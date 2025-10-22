import { ButtonGroup, Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import GeneratorForm from "@/components/generator/generatorForm/GeneratorForm.jsx"
import SaveSchemeDialog from "@/components/generator/saveSchemeDialog/SaveSchemeDialog.jsx"
import {useColorSchemeContext} from "@/contexts/colorScheme/ColorSchemeContext.js"

export default function Generator() {
	const { saved, setSaved } = useColorSchemeContext()

	return (
		<Drawer.Root placement={{ base: "bottom", md: "end" }} size={{ md: "xs" }}>
			<ButtonGroup w={{ base: "full", md: "64" }}>
				<Drawer.Trigger asChild flexGrow="1">
					<Button variant="outline" size="md">
						new color scheme
					</Button>
				</Drawer.Trigger>
				<SaveSchemeDialog saved={saved} setSaved={setSaved} />
			</ButtonGroup>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>New Scheme</Drawer.Title>
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