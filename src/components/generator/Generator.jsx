import {
	Button,
	CloseButton,
	Drawer,
	Portal,
} from "@chakra-ui/react"
import { useState, useEffect } from "react";

export default function Generator({children}) {
	const [placement, setPlacement] = useState(window.innerWidth < 768 ? "bottom": "end");

	useEffect(() => {
		const trackWindowWidth = () => {
			setPlacement(window.innerWidth < 768 ? "bottom": "end")
		}
		window.addEventListener("resize", trackWindowWidth);
		return () => window.removeEventListener("resize", trackWindowWidth);
	}, []);

	return (
			<>
				<Drawer.Root placement={placement}>
					<Drawer.Trigger asChild>
						<Button variant="outline">
							Open ({placement})
						</Button>
					</Drawer.Trigger>
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
			</>
	)
}