import {Button, Dialog} from "@chakra-ui/react";

export default function Trigger({children}) {
	return (
			<Dialog.Trigger asChild>
				{children}
			</Dialog.Trigger>
	)
}