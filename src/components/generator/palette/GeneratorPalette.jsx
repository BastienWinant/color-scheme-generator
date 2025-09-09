import { Grid, Box } from "@chakra-ui/react";

export default function GeneratorPalette() {
	return (
		<Grid
			flexGrow="1"
			templateColumns={{base: "1fr", md: "repeat(auto-fit, minmax(150px, 1fr))"}}
			templateRows={{base: "repeat(auto-fit, minmax(80px, 1fr))", md: "1fr"}}
			border="2px solid red;"
		>
			<Box borderWidth="thin">box 1</Box>
			<Box borderWidth="thin">box 2</Box>
			<Box borderWidth="thin">box 3</Box>
			<Box borderWidth="thin">box 4</Box>
			<Box border="2px solid blue">box 5</Box>
		</Grid>
	)
}