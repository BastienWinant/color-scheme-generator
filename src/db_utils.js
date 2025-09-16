import { getDatabase, ref, child, push, update } from "firebase/database";

export const writeNewColorScheme = (uid, schemeData) => {
  const db = getDatabase();

  // Get a key for a new ColorScheme.
  const newColorSchemeKey = push(child(ref(db), 'color-schemes')).key;

  // Write the new color scheme's data simultaneously in the color-schemes list and the user's color scheme list.
  const updates = {};
  // updates['/color-schemes/' + newColorSchemeKey] = schemeData;
  updates['/user-color-schemes/' + uid + '/' + newColorSchemeKey] = schemeData;

  return update(ref(db), updates);
}