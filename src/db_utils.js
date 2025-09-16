import { ref, child, push, update, remove } from "firebase/database";
import { database } from "@/firebase.js";

export const writeNewColorScheme = async (uid, schemeData) => {
  // Get a key for a new ColorScheme.
  const newColorSchemeKey = push(child(ref(database), 'color-schemes')).key;

  // Write the new color scheme's data simultaneously in the color-schemes list and the user's color scheme list.
  const updates = {};
  // updates['/color-schemes/' + newColorSchemeKey] = schemeData;
  updates[`/user-color-schemes/${uid}/${newColorSchemeKey}`] = schemeData;

  await update(ref(database), updates);

  return newColorSchemeKey
}

export const removeColorScheme = async (uid, schemeKey) => {
  const schemeRef = child(ref(database), `/user-color-schemes/${uid}/${schemeKey}`)
  await remove(schemeRef)
}