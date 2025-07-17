import TriggerDialog from "@/components/buttonDialog/index.jsx";
import { Button } from "@chakra-ui/react";

export default function AuthMenu() {
	return (
		<>
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
		</>
	)
}