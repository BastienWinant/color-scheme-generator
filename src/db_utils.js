import { ref, child, push, update, remove, get } from "firebase/database"
import { database } from "@/firebase.js"

export const writeColorSchemeData = async (uid, colorSchemeData) => {
	// Get a key for a new ColorScheme.
	const newColorSchemeKey = push(child(ref(database), 'color-schemes')).key;

	// Write the new color scheme's data simultaneously in the color schemes list and the user's color scheme list.
	const updates = {};
	updates[`/color-schemes/${newColorSchemeKey}`] = colorSchemeData;
	updates[`/user-color-schemes/${uid}/${newColorSchemeKey}`] = colorSchemeData;

	await update(ref(database), updates);

	return newColorSchemeKey
}

export const writeColorData = async (uid, colorData) => {
	// Create a key for a new Color.
	const newColorKey = colorData.hex.clean;

	// Write the new color's data simultaneously in the color list and the user's color list.
	const updates = {};
	updates[`/colors/${newColorKey}`] = colorData;
	updates[`/user-colors/${uid}/${newColorKey}`] = colorData;

	return update(ref(database), updates);
}

export const deleteColorSchemeData = async (uid, colorSchemeKey) => {
	const schemeRef = ref(database, `/user-color-schemes/${uid}/${colorSchemeKey}`)
	return remove(schemeRef)
}

export const deleteColorData = async (uid, color) => {
	const schemeRef = ref(database, `/user-colors/${uid}/${color}`)
	return remove(schemeRef)
}

export const getUserColors = async (uid) => {
	const dbRef = ref(database);
	try {
		const snapshot = await get(child(dbRef, `user-colors/${uid}`));
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			return {};
		}
	} catch (error) {
		console.log(error);
		return {};
	}
}