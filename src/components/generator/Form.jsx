import {
  Button,
  CloseButton,
  Drawer,
  IconButton,
  HStack,
  Portal,
} from "@chakra-ui/react"
import { FaHeart } from "react-icons/fa6";

export default function Form() {
	return (
		<Drawer.Root placement="bottom">
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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
							do eiusmod tempor incididunt ut labore et dolore magna
							aliqua.
						</Drawer.Body>
						<Drawer.Footer>
							<Drawer.ActionTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</Drawer.ActionTrigger>
							<Button>Save</Button>
						</Drawer.Footer>
						<Drawer.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Drawer.CloseTrigger>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	)
}