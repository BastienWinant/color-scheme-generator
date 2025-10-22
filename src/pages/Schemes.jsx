import { Container, Grid, For } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth/AuthUserContext.js";
import { onValue, ref } from "firebase/database";
import { database } from "@/firebase.js";
import ColorSchemeCard from "@/components/ColorSchemeCard.jsx";

export default function Schemes() {
	const [userColorSchemes, setUserColorSchemes] = useState({})
	const { authUser } = useAuth()

	useEffect(() => {
		if (authUser) {
			// retrieve the user's saved colors from the database
			const useColorsRef = ref(database, `/user-color-schemes/${authUser.uid}`);
			const unsubscribe = onValue(useColorsRef, snapshot => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					setUserColorSchemes(data);
				}
			});

			return () => unsubscribe()
		} else {
			setUserColorSchemes({})
		}
	}, [authUser]);

	return (
		<Container>
			<Grid
				templateColumns="repeat(auto-fit, 500px)"
				autoRows="200px"
				gap={4}
				borderWidth="medium"
			>
				<For each={Object.values(userColorSchemes)}>
					{(item, index) => {
						console.log(item)
						return <ColorSchemeCard key={index} colorScheme={item} />
					}}
				</For>
			</Grid>
		</Container>
	)
}