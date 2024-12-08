import { ref, set, child, get, remove, push, update } from 'firebase/database'
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

export const getUserSchemes = async () => {
  const currentUser = auth.currentUser
  if (currentUser) {
    const userId = currentUser.uid

    try {
      const userSchemesRef = child(ref(db), `/user-schemes/${userId}`)
      const snapshot = await get(userSchemesRef)

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

  // Write the new color's data simultaneously in the colors list and the user's color list.
  const updates = {};
  updates[`/colors/${newColorKey}`] = colorObj;
  updates[`/user-colors/${uid}/${newColorKey}`] = colorObj;

  return update(ref(db), updates);
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

  // Write the new scheme's data simultaneously in the schemes list and the user's scheme list.
  const updates = {};
  updates[`/schemes/${newSchemeKey}`] = schemeObj;
  updates[`/user-schemes/${uid}/${newSchemeKey}`] = schemeObj;

  return update(ref(db), updates);
}

// remove a user scheme from the database
export const deleteScheme = async (key, uid) => {
  try {
    const schemeRef = child(ref(db), `/user-schemes/${uid}/${key}`)
    remove(schemeRef)
  } catch {}
}

export const writeUserData = (user) => {
  const userId = user.uid
  const userName = user.displayName
  const userEmail = user.email

  set(ref(db, 'users/' + userId), {
    username: userName,
    email: userEmail,
  });
}