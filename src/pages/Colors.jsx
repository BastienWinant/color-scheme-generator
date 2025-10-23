import { Box } from "@chakra-ui/react"
import RedirectPrompt from "@/components/colorGrid/RedirectPrompt.jsx";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "@/firebase.js";
import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import ColorGrid from "@/components/colorGrid/ColorGrid.jsx"

export default function Schemes() {
	const [userColors, setUserColors] = useState(null)
	const { authUser } = useAuth()

	useEffect(() => {
		if (authUser) {
			// retrieve the user's saved colors from the database
			const userColorsRef = ref(database, `/user-colors/${authUser.uid}`);
			const unsubscribe = onValue(userColorsRef, snapshot => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					setUserColors(data);
				}
			});

			return () => unsubscribe()
		} else {
			setUserColors(null)
		}
	}, [authUser]);

	return (
		<Box position="relative" w="full" bg="bg.muted">
			{
				userColors ?
					<ColorGrid colors={userColors} /> :
					<RedirectPrompt />
			}
		</Box>
	)
}