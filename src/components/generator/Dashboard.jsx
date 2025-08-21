import {
  Button,
  CloseButton,
  Drawer,
  IconButton,
  HStack,
  Portal,
} from "@chakra-ui/react"
import { FaHeart } from "react-icons/fa6";
import Form from "./form/Form.jsx";
import {useEffect, useState} from "react";
import { useColorSchemeContext } from "@/contexts/colorSchemeContext/ColorSchemeContext.js";

export default function Dashboard() {
	const [open, setOpen] = useState(false)
	const { colorScheme } = useColorSchemeContext()

	useEffect(() => {
		setOpen(false)
	}, [colorScheme]);

	return (
		<Drawer.Root placement="bottom" open={open} onOpenChange={(e) => setOpen(e.open)}>
			<HStack borderWidth="medium">
				<Drawer.Trigger flexGrow="1" asChild>
					<Button variant="outline" size="xl">
						New
					</Button>
				</Drawer.Trigger>
				<IconButton aria-label="Save color scheme" size="xl">
					<FaHeart />
				</IconButton>
			</HStack>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content roundedTop="l3">
						<Drawer.Header>
							<Drawer.Title>Drawer Title</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body>
							<Form />
						</Drawer.Body>
						<Drawer.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Drawer.CloseTrigger>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	)
}