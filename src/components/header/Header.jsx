import {
	Box,
	HStack,
	Button
} from "@chakra-ui/react";
import TriggerDialog from "@/components/buttonDialog/index.jsx";

export default function Header() {
	return (
			<>
				<Box as="header" borderWidth="medium">
					<HStack>
						<TriggerDialog>
							<TriggerDialog.Trigger>
								<Button variant="outline">sign in</Button>
							</TriggerDialog.Trigger>
							<TriggerDialog.Dialog title="sign in">
								<p>this is a test</p>
							</TriggerDialog.Dialog>
						</TriggerDialog>
						<TriggerDialog>
							<TriggerDialog.Trigger>
								<Button variant="solid">sign up</Button>
							</TriggerDialog.Trigger>
							<TriggerDialog.Dialog title="sign up">
								<p>this is a test</p>
							</TriggerDialog.Dialog>
						</TriggerDialog>
					</HStack>
				</Box>
			</>
	)
}