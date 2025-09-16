import { ref, child, push, update, remove } from "firebase/database";
import { database } from "@/firebase.js";

export const writeNewColorScheme = async (uid, schemeData) => {
  // Get a key for a new ColorScheme.
  const newColorSchemeKey = push(child(ref(database), `user-color-schemes/${uid}`)).key;

  // Write the new color scheme's data in the user's color scheme list.
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

export const writeNewColor = async (uid, colorData) => {
  // Get a key for a new Color.
  const newColorKey = push(child(ref(database), `user-colors/${uid}`)).key;

  // Write the new color's data in the user's color list.
  const updates = {};
  // updates['/color-schemes/' + newColorSchemeKey] = schemeData;
  updates[`/user-colors/${uid}/${newColorKey}`] = colorData;

  await update(ref(database), updates);

  return newColorKey
}

export const removeColor = async (uid, colorKey) => {
  const schemeRef = child(ref(database), `/user-colors/${uid}/${colorKey}`)
  await remove(schemeRef)
}