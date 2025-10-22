import {
	AbsoluteCenter,
	Button,
	Card,
	LinkBox,
	LinkOverlay,
	Text
} from "@chakra-ui/react"
import { Link } from "react-router"

export default function RedirectPrompt() {
	return (
		<AbsoluteCenter>
			<Card.Root w="80vw" maxW="xs">
				<Card.Body>
					<Card.Description>
						<Text mb="2">Looks like you have not saved any color schemes yet...</Text>
						<Text>Head to the Generator and create masterpieces!</Text>
					</Card.Description>
				</Card.Body>
				<Card.Footer>
					<LinkBox w="full">
						<Button w="full" variant="subtle">
							Open the generator
						</Button>
						<LinkOverlay asChild>
							<Link to="/" />
						</LinkOverlay>
					</LinkBox>
				</Card.Footer>
			</Card.Root>
		</AbsoluteCenter>
	)
}