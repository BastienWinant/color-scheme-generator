import { ref, child, push, update } from "firebase/database"
import { database } from "@/firebase.js"

export function writeColorSchemeData(uid, colorSchemeData) {
	// Get a key for a new ColorScheme.
	const newColorSchemeKey = push(child(ref(database), 'color-schemes')).key;

	// Write the new color scheme's data simultaneously in the color schemes list and the user's color scheme list.
	const updates = {};
	updates[`/color-schemes/${newColorSchemeKey}`] = colorSchemeData;
	updates[`/user-color-schemes/${uid}/${newColorSchemeKey}`] = colorSchemeData;

	return update(ref(database), updates);
}

export function writeColorData(uid, colorData) {
	// Create a key for a new Color.
	const newColorKey = colorData.hex.value;

	// Write the new color's data simultaneously in the color list and the user's color list.
	const updates = {};
	updates[`/colors/${newColorKey}`] = colorData;
	updates[`/user-colors/${uid}/${newColorKey}`] = colorData;

	return update(ref(database), updates);
}