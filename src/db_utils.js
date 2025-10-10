import { ref, child, push, update, remove, get } from "firebase/database"
import { database } from "@/firebase.js"

export const writeNewColorScheme = async (uid, schemeData) => {
  // Get a key for a new ColorScheme.
  const newColorSchemeKey = push(child(ref(database), `user-color-schemes/${uid}`)).key;

  // Write the new color scheme's data in the user's color scheme list.
  const inserts = {};
  inserts[`/user-color-schemes/${uid}/${newColorSchemeKey}`] = schemeData;

  await update(ref(database), inserts);

  return newColorSchemeKey
}

export const removeColorScheme = async (uid, schemeKey) => {
  const schemeRef = child(ref(database), `/user-color-schemes/${uid}/${schemeKey}`)
  await remove(schemeRef)
}

export const writeNewColor = async (uid, colorData) => {
  const newColorKey = colorData.hex.clean

  // Write the new color's data in the user's color list.
  const inserts = {}
  inserts[`/user-colors/${uid}/${newColorKey}`] = colorData

  await update(ref(database), inserts)
}

export const removeColor = async (uid, colorKey) => {
  const schemeRef = child(ref(database), `/user-colors/${uid}/${colorKey}`)
  await remove(schemeRef)
}

export const getUserSchemes = async uid => {
  try {
    const snapshot = await get(child(database, `user-color-schemes/${uid}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.log(error);
  }
}