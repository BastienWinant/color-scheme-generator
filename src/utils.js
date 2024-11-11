import { ref, set, child, get, remove, push } from 'firebase/database'
import { auth, db } from 'Src/app'

export const getUserColors = async () => {
  const currentUser = auth.currentUser
  if (currentUser) {
    const userId = currentUser.uid

    try {
      const userColorsRef = child(ref(db), `/user-colors/${userId}`)
      const snapshot = await get(userColorsRef)

      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        return {}
      }
    } catch (error) {
      return {}
    }
  }

  return {}
}

export const writeNewColor = async (colorObj, uid) => {
  // Use the color hex code as unique table id
  const newColorKey = colorObj.hex.clean
  const userColorRef = child(ref(db), `/user-colors/${uid}/${newColorKey}`)
  return set(userColorRef, colorObj)
}

// remove a user color from the database
export const deleteColor = async (hex, uid) => {
  try {
    // the hex value is used as the key in the table
    const colorRef = child(ref(db), `/user-colors/${uid}/${hex}`)
    remove(colorRef)
  } catch {}
}

export function writeNewScheme(uid, schemeObj) {
  // Get a key for a new Scheme.
  const newSchemeKey = push(child(ref(db), 'schemes')).key

  // Write the new scheme's data in the user's scheme list.
  const userSchemeRef = child(ref(db), `/user-schemes/${uid}/${newSchemeKey}`)
  return set(userSchemeRef, schemeObj)
}