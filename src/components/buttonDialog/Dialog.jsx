import {Button, CloseButton, Dialog as ChakraDialog, Portal} from "@chakra-ui/react";

export default function Dialog({children, title}) {
	return (
			<Portal>
				<ChakraDialog.Backdrop />
				<ChakraDialog.Positioner>
					<ChakraDialog.Content>
						<ChakraDialog.Header>
							<ChakraDialog.Title>{title}</ChakraDialog.Title>
						</ChakraDialog.Header>
						<ChakraDialog.Body>{children}</ChakraDialog.Body>
						<ChakraDialog.Footer>
							<ChakraDialog.ActionTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</ChakraDialog.ActionTrigger>
							<Button>Save</Button>
						</ChakraDialog.Footer>
						<ChakraDialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</ChakraDialog.CloseTrigger>
					</ChakraDialog.Content>
				</ChakraDialog.Positioner>
			</Portal>
	)
}