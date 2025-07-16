import { Dialog, Portal, Button, CloseButton } from "@chakra-ui/react";

export default function TriggerDialog({children}) {
	return (
			<Dialog.Root>
				{children}
			</Dialog.Root>
	)
}