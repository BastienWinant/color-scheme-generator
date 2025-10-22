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
		>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Root>
	)
}