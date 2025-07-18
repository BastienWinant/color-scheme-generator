import { Button} from "@chakra-ui/react";
import { useAuth} from "@/contexts/authContext/authUserContext.js";

export default function UserMenu() {
	const { signOut } = useAuth();
	return (
			<Button onClick={signOut}>Sign out</Button>
	)
}