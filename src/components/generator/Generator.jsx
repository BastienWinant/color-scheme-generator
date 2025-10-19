import { ButtonGroup, Button, CloseButton, Drawer, Portal, IconButton } from "@chakra-ui/react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { useState } from "react"
import GeneratorForm from "@/components/generator/GeneratorForm.jsx"

export default function Generator() {
	const [saved, setSaved] = useState(false)

	const toggleSaved = () => {
		setSaved(prevSaved => !prevSaved)
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
					onClick={toggleSaved}
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