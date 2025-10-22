import { Stack, Grid, Container, For } from "@chakra-ui/react"
import Generator from "@/components/generator/Generator.jsx"
import ColorCard from "@/components/generator/ColorCard.jsx"
import { useAuth } from "@/contexts/auth/AuthUserContext.js"
import { useColorSchemeContext } from "@/contexts/colorScheme/ColorSchemeContext.js"
import { Toaster } from "@/components/ui/toaster"
import { useState, useEffect } from "react"
import { ref, onValue } from "firebase/database"
import { database } from "@/firebase.js"

export default function Index() {
	const [userColors, setUserColors] = useState({})
	const { authUser } = useAuth()
	const { colorScheme } = useColorSchemeContext()

	useEffect(() => {
		if (authUser) {
			// retrieve the user's saved colors from the database
			const useColorsRef = ref(database, `/user-colors/${authUser.uid}`);
			const unsubscribe = onValue(useColorsRef, snapshot => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					setUserColors(data);
				}
			});

			return () => unsubscribe()
		} else {
			setUserColors({})
		}
	}, [authUser]);

	return (
		<Stack w="full" gap="0">
			<Grid
				flexGrow="1"
				templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(120px, 1fr))" }}
				autoRows="1fr"
			>
				<For each={colorScheme?.colors}>
					{(item, index) => {
						return (
							<ColorCard
								key={index}
								colorObject={item}
								saved={item.hex.clean in userColors}
							/>
						)
					}}
				</For>
			</Grid>
			<Container
				display="flex"
				justifyContent="flex-end"
				py="3"
			>
				<Generator />
			</Container>
			<Toaster />
		</Stack>
	)
}