import {
	Button,
	CloseButton,
	Drawer,
	Portal,
	HStack
} from "@chakra-ui/react"

export default function Menu() {
	const placement = "bottom"

	return (
			<Drawer.Root key={placement} placement={placement}>
				<HStack border="1px solid red;">
					<Drawer.Trigger asChild>
						<Button variant="outline">
							Create
						</Button>
					</Drawer.Trigger>
					<Button>
						Save
					</Button>
				</HStack>
				<Portal>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content
								roundedTop={placement === "bottom" ? "l3" : undefined}
						>
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