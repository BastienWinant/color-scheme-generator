import { ref, get } from 'firebase/database'

import { db } from 'Src/app'

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

const updateSchemesGrid = async (schemeObjs) => {
  
}