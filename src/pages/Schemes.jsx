import { Box } from "@chakra-ui/react"
import RedirectPrompt from "src/components/schemeGrid/RedirectPrompt.jsx"
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "src/firebase.js";
import { useAuth } from "src/contexts/auth/AuthUserContext.js";
import SchemeGrid from "src/components/schemeGrid/SchemeGrid.jsx"

export default function Schemes() {
	const [userColorSchemes, setUserColorSchemes] = useState(null)
	const { authUser } = useAuth()

	useEffect(() => {
		if (authUser) {
			// retrieve the user's saved colors from the database
			const userSchemesRef = ref(database, `/user-color-schemes/${authUser.uid}`);
			const unsubscribe = onValue(userSchemesRef, snapshot => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					setUserColorSchemes(data);
				}
			});

			return () => unsubscribe()
		} else {
			setUserColorSchemes(null)
		}
	}, [authUser]);

	return (
		<Box position="relative" w="full" bg="bg.muted">
			{
				userColorSchemes ?
					<SchemeGrid colorSchemes={userColorSchemes} /> :
					<RedirectPrompt />
			}
		</Box>
	)
}