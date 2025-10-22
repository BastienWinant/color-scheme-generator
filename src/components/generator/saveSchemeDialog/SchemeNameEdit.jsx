import { Editable } from "@chakra-ui/react"

export default function SchemeNameEdit({ name, setName }) {
	return (
		<Editable.Root
			value={name}
			onValueChange={e => setName(e.value)}
			placeholder="Click to edit"
			borderWidth="thin"
			rounded="sm"
			size="lg"
			mb="4"
		>
			<Editable.Preview w="full" />
			<Editable.Input />
		</Editable.Root>
	)
}