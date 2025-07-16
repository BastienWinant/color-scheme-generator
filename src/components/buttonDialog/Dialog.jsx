import {Button, CloseButton, Dialog as ChakraDialog, Portal} from "@chakra-ui/react";

export default function Dialog({children, title}) {
	return (
			<Portal>
				<ChakraDialog.Backdrop />
				<ChakraDialog.Positioner>
					<ChakraDialog.Content>
						<ChakraDialog.Header>
							<ChakraDialog.Title textTransform="capitalize">{ title }</ChakraDialog.Title>
						</ChakraDialog.Header>
						<ChakraDialog.Body>
							{ children }
						</ChakraDialog.Body>
						<ChakraDialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</ChakraDialog.CloseTrigger>
					</ChakraDialog.Content>
				</ChakraDialog.Positioner>
			</Portal>
	)
}