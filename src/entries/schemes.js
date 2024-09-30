import { ref, child, get } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'

import(/* webpackPreload: true */ 'Src/app')
import(/* webpackPreload: true */ 'Components/header')

import { auth, db } from 'Src/app'
import { showAuthState } from 'Components/header'



const getUserSchemes = async (user) => {
  const userId = user.uid
  const userColorsRef = ref(db, '/user-schemes/' + userId)
  const snapshot = await get(userColorsRef)

  if (snapshot.exists()) {
    const schemeIds = snapshot.val()
    const userSchemes = schemeIds.map(async schemeId => {
      const schemeRef = ref(db, '/schemes/' + schemeId)
      const schemeSnapshot = await get(schemeRef)

      if (schemeSnapshot.exists) return schemeSnapshot.val()
      else return {}
    })

    return await Promise.all(userSchemes)
  } else {
    return []
  }
}

const monitorAuthState = () => {
  onAuthStateChanged(auth, async (user) => {
    showAuthState(user)
    const userSchemes = await getUserSchemes(user)
    console.log(userSchemes)
  })
}
monitorAuthState()